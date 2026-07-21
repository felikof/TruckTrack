from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Booking, Notification


@receiver(post_save, sender=Booking)
def create_booking_notification(sender, instance, created, **kwargs):
    if created and instance.status == 'pending':
        Notification.objects.create(
            type='pending',
            booking=instance,
            message="Nouvelle réservation en attente de validation",
        )
        return

    if not created:
        # on ne notifie que sur un changement RÉEL de statut vers 'cancelled'
        # initié par le transporteur (pas par l'admin lui-même)
        if instance.status == 'cancelled' and instance.cancelled_by == 'carrier':
            already_notified = Notification.objects.filter(
                booking=instance, type='cancelled'
            ).exists()
            if not already_notified:
                Notification.objects.create(
                    type='cancelled',
                    booking=instance,
                    message="Réservation annulée par le transporteur",
                )
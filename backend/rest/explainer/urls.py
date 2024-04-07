from django.urls import path, include
from rest.explainer.views.data_loader import DataLoadViewSet
from rest.explainer.views.plot_creator import PlotCreatorViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('loader', DataLoadViewSet, basename='loader')
router.register('plots', PlotCreatorViewSet, basename='plots')

urlpatterns = [
    path('', include(router.urls))
]
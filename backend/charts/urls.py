"""Include urls to each of different graphs."""

from django.urls import path
from . import views

urlpatterns = [
    path("candlestick-data/", views.candlestick, name="candlestick-data"),
    path("line-chart-data/", views.line_chart, name="line-chart-data"),
    path("bar-chart-data/", views.bar_chart, name="bar-chart-data"),
    path("pie-chart-data/", views.pie_chart, name="pie-chart-data"),
]

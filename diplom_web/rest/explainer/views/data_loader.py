from rest_framework.viewsets import GenericViewSet, ViewSet
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import serializers


class UploadSerializer(serializers.Serializer):
    file = serializers.FileField()


def get_file_path(filename):
    return f"data/{filename}"


def save_file_to_disk(file, filename):
    with open(get_file_path(filename), "wb+") as destination:
        for chunk in file.chunks():
            destination.write(chunk)


class DataLoadViewSet(GenericViewSet):
    serializer_class = UploadSerializer

    @action(methods=["POST"], detail=False, url_path="load-dataset")
    def load_dataset(self, request: Request) -> Response:
        save_file_to_disk(request.FILES['file'], "dataset")
        return Response("Файл сохранён")

    @action(methods=["POST"], detail=False, url_path="load-model")
    def load_model(self, request: Request) -> Response:
        save_file_to_disk(request.FILES['file'], "model")
        return Response("Файл сохранён")

    @action(methods=["POST"], detail=False, url_path="load-mono")
    def load_mono(self, request: Request) -> Response:
        save_file_to_disk(request.FILES['file'], "mono")
        return Response("Файл сохранён")

from rest_framework.viewsets import ViewSet

from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import serializers
from explainer.services.plot_creator import PlotCreator
from explainer.services.pickle_service import PickleService
import tempfile
from django.conf import settings

temp_dir = tempfile.TemporaryDirectory()


class CreatePlotsSerializer(serializers.Serializer):
    column = serializers.CharField()
    category_column = serializers.CharField(required=False)
    min_value = serializers.IntegerField()
    max_value = serializers.IntegerField()


class PlotCreatorViewSet(ViewSet):
    serializer_class = CreatePlotsSerializer

    @action(methods=["POST"], detail=False, url_path="create-plots")
    def create_plots(self, request: Request) -> Response:
        serializer = CreatePlotsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        pickle_service = PickleService()

        path = settings.DATA_DIR + "\\mono"
        mono = pickle_service.get_dataset_and_model(path)
        plot_creator = PlotCreator(
            mono.model,
            mono.dataset,
            serializer.data["column"],
            serializer.data["min_value"],
            serializer.data["max_value"]
        )

        host = request.get_host()
        if category_column := serializer.data.get("category_column"):
            paths = plot_creator.plot_category_plots(category_column)
            paths = [
                ["http://" + host + path.replace("\\\\", "\\") for path in cat_paths]
                for cat_paths in paths
            ]
        else:
            paths = plot_creator.plot_regular_plots()
            paths = ["http://" + host + path.replace("\\\\", "\\") for path in paths]



        return Response(data=paths, status=200)

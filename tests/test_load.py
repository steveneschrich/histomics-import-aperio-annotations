import pytest

from girder.plugin import loadedPlugins


@pytest.mark.plugin('aperio_xml_annotation_import_from_histomics')
def test_import(server):
    assert 'aperio_xml_annotation_import_from_histomics' in loadedPlugins()

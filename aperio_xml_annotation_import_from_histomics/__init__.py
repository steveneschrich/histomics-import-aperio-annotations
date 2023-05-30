from girder import plugin


class GirderPlugin(plugin.GirderPlugin):
    DISPLAY_NAME = 'aperio-xml-annotation-import-from-histomics'
    CLIENT_SOURCE_PATH = 'web_client'

    def load(self, info):
       plugin.getPlugin('histomicsui').load(info)

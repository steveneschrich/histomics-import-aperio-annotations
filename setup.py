from setuptools import setup, find_packages

with open('README.rst') as readme_file:
    readme = readme_file.read()

requirements = [
    'girder>=3.0.0a1',
    'histomicsui'
]

setup(
    author='Moffitt',
    author_email='girder.developer@example.com',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'License :: OSI Approved :: Apache Software License',
        'Natural Language :: English',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8'
    ],
    description='Plugin to import Aperio XML annotations to histomics UI.',
    install_requires=requirements,
    license='Apache Software License 2.0',
    long_description=readme,
    long_description_content_type='text/x-rst',
    include_package_data=True,
    keywords='girder-plugin, aperio_xml_annotation_import_from_histomics',
    name='aperio_xml_annotation_import_from_histomics',
    packages=find_packages(exclude=['test', 'test.*']),
    url='https://github.com/steveneschrich/histomics-import-aperio-annotations',
    version='0.1.0',
    zip_safe=False,
    entry_points={
        'girder.plugin': [
            'aperio_xml_annotation_import_from_histomics = aperio_xml_annotation_import_from_histomics:GirderPlugin'
        ]
    }
)

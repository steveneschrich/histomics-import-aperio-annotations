# Histomics Import Aperio Annotations

Girder plugin for extending Histomics UI for importing Aperio `.xml` annotations file and transform it to Histomics Annotations.
 
# How to install the plugin?

For installing the plugin you will need to got o the root folder and run the following command:

```bash
python3 -m pip install .
```
In case you want to add it to the DSA [Dockerfile](https://github.com/DigitalSlideArchive/digital_slide_archive/blob/master/Dockerfile) after the installation of the [Histomics Plugin](https://github.com/DigitalSlideArchive/digital_slide_archive/blob/master/Dockerfile#L90-L93) :

```bash
RUN cd /opt && \
    git clone https://github.com/steveneschrich/histomics-import-aperio-annotations && \
    cd /opt/histomics-import-aperio-annotations && \
    pip install --no-cache-dir -e .

```
# Development
## Before installing and running the plugin:
Be sure to have the following technologies installed with the required version:

 - NodeJS `12.22.x`
	 - You can install `nvm ` for easy node version management
 - Girder 3.1.20 or latest
```bash
pip install girder
```
 - HistomicsUI
	 - It needs to be installed as a plugin
	 - You'll need to follow the installation guide in the [plugin's repository](https://github.com/DigitalSlideArchive/HistomicsUI#installation)
 - Python 3
 - PIP
 - Docker
	 - With the CLI commands enabled (for running `docker` and `docker-compose`)

## Plugin Structure:

 ```bash
    aperio_xml_annotation_import_from_histomics
     |-> web_client
	 	 |-> utils
		 utils.js
		 xml-parser.js # Functions for parsing the xml annotations to histomics annotations
	     |-> stylesheets
	     modal.styl # CSS Styles for the TMA table
	     |-> views
		     |-> widget
			     HeaderImageViewWidget.js # Extended version of the histomics UI header widget
				 ImageViewWidget.js
	     main.js
	     routes.js
	     package.json
	     package-lock.json
     __init__.py # Girder plugin initialisation
	setup.py # Plugin setup
```

## Local Development:
For local development you'll need to follow some steps:

 **1.** Make sure you have the right `node` version installed locally, we recommend to use `nvm` for managing `node` versions:
```bash
> nvm use 12.22.12
```
**2.** In other terminal, in the root folder, run `docker` , it will create a container running `mongodb`. The most convenient way to develop the plugin is to use the devops scripts from the [Digital Slide Archive](https://github.com/DigitalSlideArchive/digital_slide_archive/tree/master/devops), you'll need to clone the repo, 
You'll need first to comment the following lines from the `docker-compose.yml` file:

https://github.com/DigitalSlideArchive/digital_slide_archive/blob/master/devops/dsa/docker-compose.yml#L4C10-L89

The, go to the `devops/dsa` folder and run the following command:
```bash
> docker-compose up
```
**3.** Once the container is running, in the first terminal (the one used in the first step) you'll need to install the required dependencies (for this plugin and Histomics), for that you'll need to run the following commands:
```bash
> pip install histomicsui
> pip install large-image
```
**4.** Once installed, run:
```bash
> girder build --dev
```
**5.** Then, finally, serve the plugin:
```bash
> GIRDER_MONGO_URI='mongodb://localhost:51467/girder' girder serve --dev
```
* *You'll need to specify the URL where docker is running, for that use the following command:* 
```bash
> docker ps -a
```
And take the port where docker `mongodb` image is running 

If you want to watch the changes when you are coding use the following command:
- *For ubuntu and MAC users*:
```bash
> sudo ls aperio_xml_annotation_import_from_histomics/web_client/**/*.js | entr -r -s 'girder build --dev --no-reinstall && GIRDER_MONGO_URI='mongodb://localhost:61784/girder' girder serve --dev'
```
> *This command will listen to any change that you do in the web_client .js files and build & serve again the project without re-installing node modules.*

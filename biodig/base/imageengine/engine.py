'''
    Class for extending in order to allow BioDIG to store the images correctly
    to allow for scalability when needed.

    Created on Mar 5, 2014

    @author: Andrew Oberlin
'''
from abc import ABCMeta, abstractmethod
import imghdr
import uuid
import PIL
import os

class ImageEngine(object):
    '''
        Abstract class for representing an ImageEngine that
        allows the administrator of the website to customize
        the storage of images to allow for scaling if needed.
    '''
    formats = set(['gif', 'tiff', 'jpeg', 'bmp', 'png'])
    
    __metaclass__ = ABCMeta
    
    def validate(self, image):
        '''
            Checks if the file type is valid for the given image.
            
            @param image: The filename of the image to analyze.
            @return: True if the file is a valid image.
        '''
        filetype = imghdr.what(image)
        return filetype and filetype in ImageEngine.formats
    
    def normalize(self, image):
        '''
            Creates a unique name for the image using a uuid. Then,
            converts the file to a PNG with the given name. Removes the
            original file and replaces it with the normalized file.
            
            @param image: The filename of the image to normalize for the web.
            @return: The location of the normalized file.
        '''
        directory, _ = os.path.split(image)
        name = os.path.join(directory, str(uuid.uuid1()) + ".png")
        with open(image, 'rb') as ifHandle:
            imagefile = PIL.Image.open(ifHandle)
            with open(name, 'wb+') as normalizedfile:
                imagefile.save(normalizedfile, 'PNG')
        os.remove(image)
        
        return name
        
    
    def thumbnail(self, image, outdir=None):
        '''
            Creates a thumbnail from the image and places it in the ../thumbnails
            directory. i.e. if the file is located in /media/pictures/ the new
            file will be placed in /media/thumbnails/ by default (outdir == None).
            
            @param image: The image to from which to create the thumbnail.
            @param outdir
            
            @return: A smaller less clear version of the image for
            
        '''
        if outdir is None:
            upper = os.path.split(os.path.split(image)[0])[0]
            outdir = os.path.join(upper, 'thumbnails')
        
        # try to make the thumbnails directory if it doesn't exist
        if not os.path.isdir(outdir):
            os.mkdir(outdir)
        
        # make the name of the file for the thumbnail
        base, extension = os.path.splitext(os.path.basename(image))
        base = base + ".thumb" + extension
        name = os.path.join(outdir, base)
        
        with open(image, 'rb') as ifHandle:
            imagefile = PIL.Image.open(ifHandle)
            with open(name, 'wb+') as thumb:
                size = (125, 125)
                imagefile.thumbnail(size, PIL.Image.ANTIALIAS)
                imagefile.save(thumb, 'PNG')
        
        return name
    
    @abstractmethod
    def save_image(self, image):
        '''
            Saves the given image and thumbnail to the storage
            place and returns the url. Should also delete the
            temporary file at the location in the image parameter.
            
            @param image: The image file location to save.
            @return: The URL of the image's save location.
        '''
        pass
    
    @abstractmethod
    def save_thumbnail(self, thumbnail):
        '''
            Saves the given thumbnail to the storage
            place and returns the url. Should also delete the
            temprorary file at the location in the thumbnail
            parameter.
            
            @param thumbnail: The thumbnail file location to save.
            @return: The URL of the thumbnail's save location.
        '''
        pass

    @abstractmethod
    def delete_image(self, image):
        '''
            Deletes the given image from the storage system.

            @param image: The URL for the image to delete.
            @throws MissingFile: If the file to delete was not located correctly. 
        '''
        pass

    @abstractmethod
    def delete_thumbnail(self, thumbnail):
        '''
            Deletes the given thumbnail from the storage system.

            @param thumbnail: The URL for the thumbnail to delete.
            @throws MissingFile: If the file to delete was not located correctly.
        '''
        pass

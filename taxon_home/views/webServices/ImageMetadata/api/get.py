import taxon_home.views.util.ErrorConstants as Errors
from taxon_home.models import Picture, PictureDefinitionTag, Organism
from django.core.exceptions import ObjectDoesNotExist
from renderEngine.WebServiceObject import WebServiceObject

class GetAPI:
    def __init__(self, user=None, fields=None):
        self.user = user
        self.fields = fields

    '''
        Gets the metadata associated with an image given the image key
        
        @param imageKey: The primary key for the image or the image
        @param isKey: Whether the first argument is a key object or not (default: true)
        
        @return: A dictionary containing organisms associated with the image and all 
        of the images attributes. The dictionary will also contain error information
        stored in the errorMessage and error fields
    '''
    def getImageMetadata(self, imageKey, isKey=True):
        organisms = []
        metadata = WebServiceObject()
        
        try:
            if (isKey):
                image = Picture.objects.get(pk__exact=imageKey) 
            else:
                image = imageKey
            
            authenticated = True
            if (image.isPrivate):
                if (self.user and self.user.is_authenticated()):
                    authenticated = image.user == self.user
                else:
                    authenticated = False
                    
            if authenticated:
                defTags = PictureDefinitionTag.objects.filter(picture__exact=image)
                
                for tag in defTags:
                    try:
                        organism = Organism.objects.get(pk__exact=tag.organism_id)
                        organisms.append({
                            'commonName' : organism.common_name,
                            'abbreviation' : organism.abbreviation,
                            'genus' : organism.genus,
                            'species' : organism.species,
                            'id' : organism.pk
                        })
                    except ObjectDoesNotExist:
                        None                    
            else:
                raise Errors.AUTHENTICATION
        except (ObjectDoesNotExist, ValueError):
            raise Errors.INVALID_IMAGE_KEY
       
        if (not metadata.isError()):
            metadata.limitFields(self.fields)
            
            # put in the information we care about
            metadata.put('organisms', organisms)
            metadata.put('description', image.description)
            metadata.put('uploadedBy', image.user.username)
            metadata.put('uploadDate', image.uploadDate.strftime("%Y-%m-%d %H:%M:%S"))
            metadata.put('url', image.imageName.url)
            metadata.put('id', image.pk)
        
        return metadata
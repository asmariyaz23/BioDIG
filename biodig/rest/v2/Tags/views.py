from biodig.base.exceptions import BadRequestException
from rest_framework.views import APIView
from rest_framework.response import Response

from biodig.rest.v2.Tags.forms import MultiGetForm, PostForm, PutForm, DeleteForm, SingleGetForm

class TagList(APIView):
    '''
       Class for rendering the view for creating Tags and
       searching through the Tags.
    '''

    def get(self, request, image_id, tag_group_id):
        '''
            Method for getting multiple Tags either through search
            or general listing.
        '''
        params = dict((key, val) for key, val in request.QUERY_PARAMS.iteritems())
        params['image_id'] = image_id
        params['tag_group_id'] = tag_group_id
        form = MultiGetForm(params)

        if not form.is_valid():
            raise BadRequestException()

        return Response(form.submit(request))

    def post(self, request, image_id, tag_group_id):
        '''
            Method for creating a new Tag.
        '''
        params = dict((key, val) for key, val in request.DATA.iteritems())
        params.update(request.QUERY_PARAMS)
        params['image_id'] = image_id
        params['tag_group_id'] = tag_group_id
        form = PostForm(params)

        if not form.is_valid():
            e = BadRequestException()
            e.detail = str(form.errors)
            raise e
        return Response(form.submit(request))


class TagSingle(APIView):
    '''
       Class for rendering the view for getting a Tag, deleting a Tag
       and updating a Tag.
    '''

    def get(self, request, image_id, tag_group_id, tag_id):
        '''
            Method for getting multiple Tags either through search
            or general listing.
        '''
        params = dict((key, val) for key, val in request.QUERY_PARAMS.iteritems())
        params['tag_id'] = tag_id
        params['image_id'] = image_id
        params['tag_group_id'] = tag_group_id
        form = SingleGetForm(params)

        if not form.is_valid():
            raise BadRequestException()

        return Response(form.submit(request))

    def put(self, request, image_id, tag_group_id, tag_id):
        '''
            Method for updating a TagGroup's information.
        '''
        params = dict((key, val) for key, val in request.DATA.iteritems())
        params.update(request.QUERY_PARAMS)
        params['tag_id'] = tag_id
        params['image_id'] = image_id
        params['tag_group_id'] = tag_group_id
        form = PutForm(params)

        if not form.is_valid():
            e = BadRequestException()
            e.detail = form.errors
            raise e
        return Response(form.submit(request))

    def delete(self, request, image_id, tag_group_id, tag_id):
        '''
            Method for deleting a a TagGroup.
        '''
        params = dict((key, val) for key, val in request.QUERY_PARAMS.iteritems())
        params['tag_id'] = tag_id
        params['image_id'] = image_id
        params['tag_group_id'] = tag_group_id
        form = DeleteForm(params)

        if not form.is_valid():
            raise BadRequestException()

        return Response(form.submit(request))

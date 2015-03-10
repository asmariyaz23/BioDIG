from django.db import models

class OrgWithGenome(models.Model):
    organism_id = models.IntegerField(primary_key=True)
    abbreviation = models.CharField(max_length=255)
    genus = models.CharField(max_length=255)
    species = models.CharField(max_length=255)
    common_name = models.CharField(max_length=255)
    comment = models.TextField()
    class Meta:
        db_table = u'organismwithgenome'
        app_label = u'base'
        abstract = True

    def __unicode__(self):
        return self.common_name
    # READ ONLY MODEL
    def save(self, **kwargs):
        raise NotImplementedError

class OrgWithImages(models.Model):
    organism_id = models.IntegerField(primary_key=True)
    abbreviation = models.CharField(max_length=255)
    genus = models.CharField(max_length=255)
    species = models.CharField(max_length=255)
    common_name = models.CharField(max_length=255)
    comment = models.TextField()
    class Meta:
        db_table = u'organismwithimages'
        app_label = u'base'
        abstract = True

    def __unicode__(self):
        return self.common_name
    # READ ONLY MODEL
    def save(self, **kwargs):
        raise NotImplementedError

class OrgWithTags(models.Model):
    organism_id = models.IntegerField(primary_key=True)
    abbreviation = models.CharField(max_length=255)
    genus = models.CharField(max_length=255)
    species = models.CharField(max_length=255)
    common_name = models.CharField(max_length=255)
    comment = models.TextField()
    class Meta:
        db_table = u'organismwithtags'
        app_label = u'base'
        abstract = True

    def __unicode__(self):
        return self.common_name
    # READ ONLY MODEL
    def save(self, **kwargs):
        raise NotImplementedError

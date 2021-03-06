from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^$',
        view=views.Photos.as_view(),
        name='photos'
    ),
    url(
        regex=r'^create/$',
        view=views.CreatePhoto.as_view(),
        name='create_photo'
    ),
    url(
        regex=r'^update/(?P<image_id>[0-9]+)/$',
        view=views.UpdatePhoto.as_view(),
        name='update_photo'
    ),
    url(
        regex=r'^(?P<image_id>[0-9]+)/$',
        view=views.PhotoDetail.as_view(),
        name='photo_detail'
    ),
    url(
        regex=r'^photos/(?P<username>\w+)/$',
        view=views.PhotosByUsername.as_view(),
        name='photo_list'
    ),
    url(
        regex=r'^(?P<image_id>[0-9]+)/comments/$',
        view=views.CommentOnPhoto.as_view(),
        name='photo_comment'
    ),
    url(
        regex=r'^comments/(?P<comment_id>[0-9]+)/$',
        view=views.Comment.as_view(),
        name='comment'
    ),
    url(
        regex=r'^(?P<image_id>[0-9]+)/likes/$',
        view=views.LikeImage.as_view(),
        name='like_image'
    ),
    url(
        regex=r'^(?P<image_id>[0-9]+)/unlikes/$',
        view=views.UnlikeImage.as_view(),
        name='unlike_image'
    )
]
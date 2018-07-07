"""root URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^users/', include('users.urls', namespace='users')),
    url(r'^gallery/', include('gallery.urls', namespace='gallery'))
    
]

urlpatterns += [
    url(r'^$', TemplateView.as_view(template_name="index.html")),
    url(r'^search/', TemplateView.as_view(template_name="index.html")),
    url(r'^mypage/', TemplateView.as_view(template_name="index.html")),
    url(r'^login/', TemplateView.as_view(template_name="index.html")),
    url(r'^register/', TemplateView.as_view(template_name="index.html")),
    url(r'^editor/', TemplateView.as_view(template_name="index.html")),
    url(r'^image/(?P<id>[0-9]+)/$', TemplateView.as_view(template_name="index.html")),
    url(r'^user/(?P<username>\w+)/$', TemplateView.as_view(template_name="index.html")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

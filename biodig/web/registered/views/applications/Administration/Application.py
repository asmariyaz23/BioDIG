'''
    Application for the Logout Handler of the DOME
    URL: /logout_handler
    
    Author: Andrew Oberlin
    Date: August 14, 2012
'''
from biodig.base.renderEngine.RegisteredApplicationBase import RegisteredApplicationBase
from biodig.web.registered.views.pagelets.NavBarPagelet import NavBarPagelet
from biodig.web.registered.views.pagelets.WorkbenchPagelet import WorkbenchPagelet
from biodig.web.public.views.pagelets.FooterPagelet import FooterPagelet

class Application(RegisteredApplicationBase):
    def doProcessRender(self, request):
        args = {
            'title' : 'Administration'
        }
        
        self.setApplicationLayout('registered/base.html', args)
        self.addPageletBinding('navBar', NavBarPagelet())
        self.addPageletBinding('center-1', WorkbenchPagelet())
        self.addPageletBinding('footer', FooterPagelet())

'''
    Used for mapping to the url in urls.py
'''          
def renderAction(request):
    return Application().render(request)


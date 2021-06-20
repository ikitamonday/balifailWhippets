import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import HomePagePreview from './preview-templates/HomePagePreview'

CMS.registerMediaLibrary(uploadcare)

if (window.location.hostname === 'localhost' && window.localStorage.getItem('netlifySiteURL')) {
  CMS.registerPreviewStyle(window.localStorage.getItem('netlifySiteURL') + '/styles.css')
} else {
  CMS.registerPreviewStyle('/styles.css')
}

CMS.registerPreviewTemplate('homePage', HomePagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)

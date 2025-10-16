# TODO: Make Website Responsive

## Steps to Complete

1. **Update sections.css with comprehensive media queries**
   - Add breakpoints: @media (max-width: 480px), @media (max-width: 768px), @media (max-width: 1024px)
   - Adjust hero section: reduce padding from 80px to smaller, font-size from 34px to smaller, make hero-image img max-width:100% instead of fixed 420px
   - Adjust navigation: ensure nav-inner flex-wrap if needed, but links hidden on mobile
   - Adjust about section: reduce padding, font sizes
   - Adjust services grid: change minmax to smaller for mobile
   - Adjust testimonials, case studies, process, cta, faq, blog, contact, footer: reduce paddings, adjust grids/flex
   - Make all images responsive: add max-width:100%; height:auto; where needed
   - Adjust footer: add flex-wrap: wrap, reduce gaps on mobile

2. **Test responsiveness**
   - Run the app with npm start
   - Use browser to check on different screen sizes or dev tools responsive mode
   - Verify layouts on mobile, tablet, desktop

3. **Optional: Add hamburger menu for nav**
   - If needed, update Header.js to include hamburger toggle for nav-links on mobile

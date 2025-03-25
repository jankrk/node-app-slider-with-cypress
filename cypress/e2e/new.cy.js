// test_1
describe('Swiper Gallery Navigation Test', function () {
    it('Allows user to navigate slides using buttons', function () {
        cy.visit('http://localhost:3000');
        
        cy.get('.swiper-slide-active').invoke('text').then((firstSlideText) => {
            cy.get('.swiper-button-next').click();
            cy.wait(1000);
            cy.get('.swiper-slide-active').invoke('text').should('not.eq', firstSlideText);
        });
    
        cy.get('.swiper-slide-active').invoke('text').then((secondSlideText) => {
            cy.get('.swiper-button-prev').click();
            cy.wait(1000);
            cy.get('.swiper-slide-active').invoke('text').should('not.eq', secondSlideText);
        });
    });
});
  
// test_2
describe('Swiper Gallery Slide Content Test', function () {
    it('Verifies title and description for each visible slide', function () {
        cy.visit('http://localhost:3000');
        
        const slides = [
            { city: 'Rome', country: 'Italy' },
            { city: 'London', country: 'United Kingdom' },
            { city: 'Paris', country: 'France' }
        ];
        
        slides.forEach((slide, index) => {
            if (index > 0) {
                cy.get('.swiper-button-next').click();
                cy.wait(1000);
            }
            
            cy.get('.swiper-slide-active').within(() => {
                cy.get('h1').should('be.visible').and('contain', slide.city);
                cy.get('p').should('be.visible').and('contain', slide.country);
            });
        });
    });
});
  
// test_3
describe('Swiper Gallery Responsiveness Test', function () {
    const viewports = [
        { device: 'Desktop', width: 1280, height: 800 },
        { device: 'Tablet', width: 768, height: 1024 },
        { device: 'Mobile', width: 375, height: 667 }
    ];
  
    viewports.forEach(viewport => {
        it(`Checks gallery on ${viewport.device}`, function () {
            cy.viewport(viewport.width, viewport.height); 
            cy.visit('http://localhost:3000');
    
            cy.get('.swiper').should('be.visible');
            cy.get('.swiper-button-next').should('be.visible');
            cy.get('.swiper-button-prev').should('be.visible');
        });
    });
});
  
// test_4
describe('Swiper Gallery Visibility Test', function () {
    it('Checks if gallery and navigation buttons are visible', function () {
        cy.visit('http://localhost:3000');
    
        cy.get('.swiper').should('be.visible');
        cy.get('.swiper-slide').should('have.length.at.least', 3); 
        cy.get('.swiper-button-next').should('be.visible');
        cy.get('.swiper-button-prev').should('be.visible');
    });
});
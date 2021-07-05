class Links
{
    constructor()
    {
        this.CURRENT_URI = window.location.hostname;
        this.PORT = window.location.port || '';
        if(this.CURRENT_URI === 'cristhianbh98.github.io') this.CURRENT_URI = this.CURRENT_URI + '/CLIP/';
        this.CURRENT_URI = `//${this.CURRENT_URI}${this.PORT === '' ? '' : `:${this.PORT}/`}`;
        this.events();
    }   

    //Events
    events()
    {
        document.getElementById('header-logo__link').href = this.CURRENT_URI;
        document.getElementById('footer-logo__link').href = this.CURRENT_URI;
        document.getElementById('home').href = this.CURRENT_URI;
        document.getElementById('about').href = this.CURRENT_URI + 'about.html';
        document.getElementById('contact').href = this.CURRENT_URI + 'contact.html';
    }
    
    //Methods
}

export default Links;
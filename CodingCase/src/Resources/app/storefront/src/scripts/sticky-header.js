import Plugin from 'src/plugin-system/plugin.class'

export default class StickyHeader extends Plugin {

    init() {
        console.info('Test')

        this.PluginManager = window.PluginManager;

        this.createElement()
        this.addEventListeners()
        this.reinitializePlugin()
    }

    createElement(){
        console.info("create!!")
        this._navClone = this.el.cloneNode(true)
        this._navClone.classList.add('js-header-sticky')
        this._navClone.removeAttribute('id')
        document.body.appendChild(this._navClone)
    }

    addEventListeners(){
        document.removeEventListener('scroll', this.onScroll.bind(this))
        document.addEventListener('scroll', this.onScroll.bind(this))

    }

    onScroll(){
        const scrollPosition = document.documentElement.scrollTop;

        if(scrollPosition > 100){
            if(!this._navClone.classList.contains('is--active')){
                this._navClone.classList.add('is--active')
            }
        }   else {
                this._navClone.classList.remove('is--active')
        }
    }

    reinitializePlugin(){
        this.PluginManager.initializePlugin(
            'FlyoutMenu',
            '[data-flyout-menu="true"]',
            {}
        )
        
    }
}
(function () {
    const elm = {
        pref: s('#tog-pref'),
        modal: s('#preferences')
    };

    function Bulat() {
        this.width = 25;
        this.color = '#000';
        this.create = (x, y) => {
            const elm = document.createElement('div');
            elm.classList.add('bulat');

            if(this.color == 'random') elm.style.backgroundColor = randomColor();
            else elm.style.backgroundColor = this.color;

            elm.style.width = this.width + 'px';
            elm.style.height = this.width + 'px';
            elm.style.left = x + 'px';
            elm.style.top = y + 'px';
            s('.canvas').appendChild(elm);
        };
        this.remove = () => ss('.bulat').forEach(elm => elm.remove());
        this.removeLast = () => {
            const elm = s('.canvas').lastElementChild;
            if(elm != null) elm.remove();
        }
    }

    const b = new Bulat();
    window.onclick = e => b.create(e.x, e.y);

    s('html').ondrag = e => {
        if(e.x != 0 && e.y != 0) b.create(e.x, e.y);
        return false;
    }

    //Pen width onchange
    ss('input[name=pw]').forEach(elm => elm.onclick = () => b.width = elm.value);
    ////Pen color onchange
    ss('input[name=pc]').forEach(elm => elm.onclick = () => b.color = elm.value);
    ss('input[name=pbg]').forEach(elm => elm.onclick = () => document.body.style.backgroundColor = elm.value);

    elm.pref.onclick = () => elm.modal.classList.toggle('hide');
    
    getKey('KeyZ', b.removeLast);
    getKey('Space', b.remove);
})();
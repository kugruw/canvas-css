(function () {
    const elm = {
        dragArea: s('html'),
        canvas: s('.canvas'),
        pref: s('#tog-pref'),
        modal: s('#preferences'),
        mt: s('#main-title')
    };

    function onDrawListener() {
        setInterval(() => {
            if(elm.canvas.childElementCount == 0) elm.mt.show();
            else elm.mt.hide();
        }, 100);
    }

    function Bulat() {
        this.width = 25;
        this.color = '#000';
        this.create = (x, y) => {
            const bulat = document.createElement('div');
            bulat.classList.add('bulat');

            if(this.color == 'random') bulat.style.backgroundColor = randomColor();
            else bulat.style.backgroundColor = this.color;

            bulat.style.width = this.width + 'px';
            bulat.style.height = this.width + 'px';
            bulat.style.left = x + 'px';
            bulat.style.top = y + 'px';
            elm.canvas.appendChild(bulat);
        };
        this.remove = () => ss('.bulat').forEach(elm => elm.remove());
        this.removeLast = () => {
            const last = elm.canvas.lastElementChild;
            if(last != null) last.remove();
        }
    }

    const b = new Bulat();
    elm.canvas.klik(e => b.create(e.x, e.y));

    elm.canvas.ondrag = e => {
        if(e.x != 0 && e.y != 0) b.create(e.x, e.y);
    }

    //Pen width onchange
    ss('input[name=pw]').forEach(elm => elm.onclick = () => b.width = elm.value);
    ////Pen color onchange
    ss('input[name=pc]').forEach(elm => elm.onclick = () => b.color = elm.value);
    ss('input[name=pbg]').forEach(elm => elm.onclick = () => document.body.style.backgroundColor = elm.value);

    elm.pref.onclick = () => elm.modal.classList.toggle('hide');
    
    getKey('z', b.removeLast);
    getKey(' ', b.remove);
    onDrawListener();
})();

//Perbaiki shadow
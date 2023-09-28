//Knight ou Sorcerer
//Little monster ou Big monster
class Charecter {
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name
    }
    get life() {
        return this._life;
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife
    }
}
class Knight extends Charecter {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}
class Sorcerer extends Charecter {
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;
    }
}
class LittleMonster extends Charecter {
    constructor() {
        super('LittleMonster');
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;

    }
}
class BigMonster extends Charecter {
    constructor() {
        super('BigMonster');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;

    }
}
class Stage {
    constructor(figther1, figther2, figther1E1, figther2E1, logobject) {
        this.figther1 = figther1;
        this.figther2 = figther2;
        this.figther1E1 = figther1E1;
        this.figther2E1 = figther2E1;
        this.log = logobject;

    }
    start() {
        this.update();

        this.figther1E1.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.figther1, this.figther2));
        this.figther2E1.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.figther2, this.figther1));

    }
    update() {
        this.figther1E1.querySelector('.name').innerHTML = `${this.figther1.name} - ${this.figther1.life} HP`
        let f1Pct = (this.figther1.life / this.figther1.maxLife) * 100;
        this.figther1E1.querySelector('.bar').style.width = `${f1Pct}%`;






        this.figther2E1.querySelector('.name').innerHTML = `${this.figther2.name} - ${this.figther2.life} HP`
        let f2Pct = (this.figther2.life / this.figther2.maxLife) * 100;
        this.figther2E1.querySelector('.bar').style.width = `${f2Pct}%`;

    }
    doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage(`atacando cachorro morto`);
            return;
        }
        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;
        if (actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
        }
        else {
            this.log.addMessage(`${attacked.name} conseguio defender...`)
        }
        this.update();
    }
}
class Log {
    list = [];
    constructor(listE1) {
        this.listE1 = listE1;
    }
    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }
    render() {
        this.listE1.innerHTML = '';
        for (let i in this.list) {
            this.listE1.innerHTML += `<li>${this.list[i]}<li>`
        }
    }
}
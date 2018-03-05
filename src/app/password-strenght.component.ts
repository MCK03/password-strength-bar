import { Component, OnChanges, Input, SimpleChange } from '@angular/core';

@Component({
    selector: 'password-strength-bar',
    styles: [`
.strength-meter {
    position: relative;
    height: 5px;
    background: #DDD;
    margin: 5px auto 0px;
    border-radius: 3px;
   
}
.strength-meter:before,
.strength-meter:after {
    content: '';
    height: inherit;
    background: transparent;
    display: block;
    border-color: #FFF;
    border-style: solid;
    border-width: 0 5px 0 5px;
    position: absolute;
    width: 42%;
    z-index: 10;
}

.strength-meter:before {
    left: 20%;
}

.strength-meter:after {
    right: 20%;
}

.strength-meter-fill {
    background: transparent;
    height: inherit;
    position: absolute;
    width: 0;
    border-radius: inherit;
    transition: width 0.5s ease-in-out, background 0.25s;
}

.strength-meter-fill[data-strength='1'] {
    background: darkred;
    width: 20%;
}

.strength-meter-fill[data-strength='2'] {
    background: gold;
    background: #ffbc29;
    width: 40%;
}

.strength-meter-fill[data-strength='3'] {
    background: gold;
    width: 60%;
}

.strength-meter-fill[data-strength='4'] {
    background: yellowgreen;
    background: #8acf58;
    width: 80%;
}

.strength-meter-fill[data-strength='5'] {
    background: green;
    background: #00853f;
    width: 100%;
}
`],
    template: `
    <div id="strength" #strength>
         <div class="strength-meter" >
                            <div Class="strength-meter-fill" attr.data-strength="{{barcount}}"></div>
                            
         </div>
         
    </div>
`
})
export class PasswordStrengthBar implements OnChanges {
    @Input() passwordToCheck: string;
    barcount: number = 0;

    private colors = ['darkred', 'orangered', 'orange', 'yellowgreen', 'green'];

    private static measureStrength(p) {
        var _force = 0;
        var _regex = /[$-/:-?{-~!"^_`\[\]]/g;

        var _lowerLetters = /[a-z]+/.test(p);
        var _upperLetters = /[A-Z]+/.test(p);
        var _numbers = /[0-9]+/.test(p);
        var _symbols = _regex.test(p);

        var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];

        var _passedMatches = 0;
        for (let _flag of _flags) {
            _passedMatches += _flag === true ? 1 : 0;
        }

        _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
        _force += _passedMatches * 10;

        // penality (short password)
        _force = (p.length <= 6) ? Math.min(_force, 10) : _force;

        // penality (poor variety of characters)
        _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
        _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
        _force = (_passedMatches === 3) ? Math.min(_force, 40) : _force;

        return _force;

    }
    private getColor(s) {
        var idx = 0;
        if (s <= 10) {
            idx = 0;
        }
        else if (s <= 20) {
            idx = 1;
        }
        else if (s <= 30) {
            idx = 2;
        }
        else if (s <= 40) {
            idx = 3;
        }
        else {
            idx = 4;
        }
        return {
            idx: idx + 1
        };
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (SimpleChange != null && SimpleChange != undefined) {
            var password = changes['passwordToCheck'].currentValue;
            this.barcount = 0;
            if (password != "" && password != null && password != undefined) {
                let c = this.getColor(PasswordStrengthBar.measureStrength(password));
                this.barcount = c.idx;
            }
        }
    }
}

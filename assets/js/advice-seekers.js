let slider = document.getElementById('slider');
let background = document.querySelector('.calculate-top');
let procentBlock = document.getElementById('income');
let calculateBtn = document.querySelector('.calculate-btn');
let value = document.getElementById("text");
let prop = document.getElementById('prop');
let inputs = [value];
noUiSlider.create(slider, {
    start: [500],
    connect: [true, false],
    range: {
        'min': 50000,
        'max': 500000
    },
    step: 5000,
    format: {
      from: function(value) {
            return Math.round(+value);
        },
      to: function(value) {
            return Math.round(+value);
        }
    },
    tooltips: {
        to: function() {
            let numb = +value.value;
            var tooltip = document.querySelector('.noUi-tooltip');
            return result = (numb < 144999) ? tooltip.textContent = 'Bronze' :
                (numb < 244999) ? tooltip.textContent = 'Silver' :
                (numb < 494999) ? tooltip.textContent = 'Gold' :
                (numb >= 495000) ? tooltip.textContent = 'Diamond' : '';

        }
    }
});


function color(classBlock, text, color, proportions) {
  background.className = classBlock;
  procentBlock.textContent = text + '%';
  calculateBtn.style.backgroundColor = color;
  prop.textContent = proportions * text / 100;
}

slider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = values[handle];
})

slider.noUiSlider.on('update', function (values, handle) {
    value.innerHTML = values[handle];
    let result = (values[handle] < 149999) ? color('c-50', 118, '#A37A60', values[handle]) :
                 (values[handle] < 249999) ? color('c-150', 120, '#96A6B9', values[handle]) :
                 (values[handle] < 499999) ? color('c-250', 122, '#DFBA4B', values[handle]) :
                 (values[handle] == 500000) ? color('c-500', 125, '#6B9FE0', values[handle]) : ''
});

inputs.forEach(function(input, handle) {

    input.addEventListener('change', function() {
        slider.noUiSlider.setHandle(handle, this.value);
    });

    input.addEventListener('keydown', function(e) {

        var values = slider.noUiSlider.get();
        var value = Number(values[handle]);

        // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
        var steps = slider.noUiSlider.steps();

        // [down, up]
        var step = steps[handle];

        var position;

        // 13 is enter,
        // 38 is key up,
        // 40 is key down.
        switch (e.which) {

            case 13:
                stepsSlider.noUiSlider.setHandle(handle, this.value);
                break;

            case 38:

                // Get step to go increase slider value (up)
                position = step[1];

                // false = no step is set
                if (position === false) {
                    position = 1;
                }

                // null = edge of slider
                if (position !== null) {
                    stepsSlider.noUiSlider.setHandle(handle, value + position);
                }

                break;

            case 40:

                position = step[0];

                if (position === false) {
                    position = 1;
                }

                if (position !== null) {
                    stepsSlider.noUiSlider.setHandle(handle, value - position);
                }

                break;
        }
    });
});

let calcInput = document.getElementById('text');
calcInput.onkeydown = function(e) {
    if ((e.which >= 48 && e.which <= 57) // numbers
        ||
        (e.which >= 96 && e.which <= 105) // num lock
        ||
        e.which == 8 // backspace
        ||
        (e.which >= 37 && e.which <= 40) // arrows
        ||
        e.which == 46 || e.which == 13) // delete and enter
    {
        return true;
    } else {
        return false;
    }
};
/**
 * @description Модуль, привязывющий функции ProgressBlock-а к собственным элементам управления
 */
;(function () {
    const progressBlock = document.querySelector('.progress-block');

    const progressBlockManager = new ProgressBlockManager(progressBlock);

    const inputValueLabel = document.querySelector('.progress-block-control__input');

    inputValueLabel.addEventListener('change', function (event) {
        progressBlockManager.setValue(+inputValueLabel.value);
    });

    const setHideLabel = document.querySelector('.checkbox__input_hidden');

    setHideLabel.addEventListener('change', function (event) {
        if (setHideLabel.checked) {
            progressBlockManager.setMod('hidden', 'yes');
        } else {
            progressBlockManager.setMod('hidden', '');
        }
    });

    const setAnimationLabel = document.querySelector('.checkbox__input_animated');

    setAnimationLabel.addEventListener('change', function (event) {
        if (setAnimationLabel.checked) {
            progressBlockManager.setMod('animated', 'yes');
        } else {
            progressBlockManager.setMod('animated', '');
        }
    });
}());
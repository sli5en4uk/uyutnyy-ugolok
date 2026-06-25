$(document).ready(function () {
    $('.countup').each(function () {
        const $this = $(this);
        const countTo = parseInt($this.attr('data-end'));

        $this.animate({
            countNum: countTo
        }, {
            duration: 3000,
            easing: 'linear',
            step: function () {
                $this.text(Math.floor(this.countNum));
            },
            complete: function () {
                $this.text(this.countNum);
            }
        });
    });
});
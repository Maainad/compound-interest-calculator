function reset() {
  $("html, body").animate({ scrollTop: 0 }, 500);
  $('.input-tag').each(function(i, element) {
    element.value = "";
});
}

function calculate() {

  $('.box2').empty()

  $('.input-tag').each(function(i, element) {
    if (element.value == "") {
      alert("الرجاء تعبئة جميع الحقول")
      return false;
    } else if (element.value == 0) {
      alert("القيم يجب ان تكون اكبر من 0")
      return false;
    }
  })

  var initialInvestment = $("#initialInvestment").val()
  var yearlyInvestment = $("#monthlyInvestment").val() * 12
  var interestRate = $("#interestRate").val()
  var years = $("#years").val()
  var yearText = ''

  if (initialInvestment && yearlyInvestment && interestRate && years) {
    if (years <= 10) {
      yearText = 'سنوات'
    } else {
      yearText = 'سنة'
    }

    var result = initialInvestment
    var amountByYears = []

    for (let i = 1; i <= years; i++) {
      result *= 1 + (interestRate / 100)
      result += yearlyInvestment
      amountByYears.push(Math.round(result).toLocaleString())
    }

    var content = `
    <div class="card big-card">
      <h2>المبلغ بعد <span class="greenAndBold">${years}</span> ${yearText} </h2>
      <h1>${Math.round(result).toLocaleString()} ريال</h1>
    </div>

    `

    for (let i = 0; i < amountByYears.length; i++) {
      content += `

      <div class="card small-card">
        <h2>السنة <span class="greenAndBold">${i + 1}</span></h2>
        <h2><span class="greenAndBold"> ${amountByYears[i]} ريال</span></h2>
      </div>
    `
    }

    $('.box2').append(content)
    $('html, body').animate({scrollTop: $(".box2").offset().top}, 500);
  }



}


$(document).on('keypress',function(e) {
    if(e.which == 13 && $('.input-tag').is(':focus')) {
        calculate()
        $('.input-tag').blur()
    }
});

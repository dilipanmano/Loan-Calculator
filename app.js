document.getElementById('loan-form').addEventListener('submit',function(e){
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    setTimeout(calculate,2000);
    e.preventDefault();
});

function calculate(e){
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calcInterest = parseFloat(interest.value) / 100 / 12;
    const calcYears = parseFloat(years.value) * 12;

    const x = Math.pow(1+calcInterest,calcYears);
    const monthly = (principal*x*calcInterest)/(x-1);

    if(isFinite(monthly)){
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calcYears).toFixed(2);
        totalInterest.value = ((monthly * calcYears) - principal).toFixed(2);
    }else{
        console.log('Incorrect numbers');
        callError('Incorrect Numbers');
    }
    e.preventDefault();
}

function callError(msg){
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    const errorToast = document.createElement('div');

    const cardElement = document.querySelector('.card');
    const HeadingElement = document.querySelector('.heading');

    errorToast.className = "alert alert-danger";
    errorToast.textContent = msg;

    cardElement.insertBefore(errorToast,HeadingElement);
   
    setTimeout(clearToast,2000);

}

function clearToast(){
    document.querySelector('.alert').remove();
}


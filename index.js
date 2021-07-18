let tipPercentage = '';
let avgTip = 0.00;
let avgBill = 0.00;

const enableResetButton = () => {
    $('.reset-btn').prop('disabled', false);
};

const disableResetButton = () => {
    $('.reset-btn').prop('disabled', true);
};

const setAvgTipValue = (avgTipValue) => {
    $('#averageTip').text('$' + avgTipValue.toFixed(2));
}

const setAvgBillValue = (avgBillValue) => {
    $('#averageBill').text('$' + avgBillValue.toFixed(2));
}

const computeTip = (billValue, peopleCount, tipPercentage) => {
    let totalTipValue = billValue * tipPercentage * 0.01;
    setAvgTipValue(totalTipValue/peopleCount);
    setAvgBillValue(billValue/peopleCount);
    enableResetButton();
};

const addErrorMessage = () => {
    $('#errorMessage').removeAttr('hidden');
    $('#peopleCount').addClass('error');
};

const removeErrorMessage = () => {
    $('#errorMessage').attr('hidden', true);
    $('#peopleCount').removeClass('error');
}

const checkIfTipIsToBeComputed = () => {
    let billValue = $('#billAmount').val();
    let peopleCount = $('#peopleCount').val();
    if(peopleCount!= '' && parseInt(peopleCount) == 0){
        addErrorMessage();
        return;
    }
    else{
        removeErrorMessage();
    }
    if(billValue == '' || peopleCount == '' || tipPercentage == ''){
        return;
    }
    computeTip(parseInt(billValue), parseInt(peopleCount), parseInt(tipPercentage));
}

$('#billAmount').change((event) => {
    newBillValue =  event.target.value;
    if(newBillValue == ''){
        disableResetButton();
    }
    else{
        checkIfTipIsToBeComputed();
    }
})


$('#peopleCount').change((event) => {
    newPeopleCount =  event.target.value;
    if(newPeopleCount == ''){
        disableResetButton();
    }
    else{
        checkIfTipIsToBeComputed();
    }
})

$('#tipPercentage').change((event) => {
    if(event.target.value == '' && $('.calc-selected-tip-percentage').length)
        return;
    else if(event.target.value != '')
        $('.calc-selected-tip-percentage').removeClass('calc-selected-tip-percentage');
    tipPercentage = event.target.value;
    if(tipPercentage == ''){
        disableResetButton();
    }
    else{
        checkIfTipIsToBeComputed();
    }
});

$('.calc-tip-percentage').click((event) => {
    $('.calc-selected-tip-percentage').removeClass('calc-selected-tip-percentage');
    tipPercentage = event.target.id.slice(-2);
    $('#'+event.target.id).addClass('calc-selected-tip-percentage');
    $('#tipPercentage').val('');
    checkIfTipIsToBeComputed();
})

$('.reset-btn').click(() => {
    $('#billAmount').val('');
    $('#peopleCount').val('');
    $('#tipPercentage').val('');
    $('#averageTip').text('$0.00');
    $('#averageBill').text('$0.00');
    $('.calc-selected-tip-percentage').removeClass('calc-selected-tip-percentage');
    disableResetButton();
});

import moment from 'moment';

export const computeAge = ( dob ) => {
    const formattedDOB = moment(dob, 'DD-MM-YYYY').format('MM-DD-YYYY');
    const age = moment().diff(formattedDOB, 'years', true);
    return Math.round(age) ;
}
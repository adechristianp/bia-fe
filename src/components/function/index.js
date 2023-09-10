export const dateFormat = (newDate, withTime = false) => {
    let date = new Date(newDate);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    const time = withTime ? ' ' + date.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '';
    // const m = date.toLocaleString('default', { minute: 'numeric' });
    return day + ' ' + month + ' ' + year + ' ' + time;
}
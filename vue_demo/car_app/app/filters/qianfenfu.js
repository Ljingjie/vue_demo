export default (v) => {
    return v.toString().replace(/\B(?=(\d\d\d)+$)/g , ",");
}
export default function(timestamp) {
    // var time = timestamp.replace('Z','');
    return new Date(timestamp).toLocaleString();
}
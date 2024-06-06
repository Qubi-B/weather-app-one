var output = "";

for(i = 0; i < 40; i++){
    output += '<tr>\n';
    output += '        <td><span class="hour_name_' + i.toString() + '"></span></td>\n';
    output += '        <td><span class="hour_icon_' + i.toString() + '"></span></td>\n';
    output += '        <td><span class="hour_temp_min_' + i.toString() + '"></span></td>\n';
    output += '        <td><span class="hour_temp_max_' + i.toString() + '"></span></td>\n';
    output += '</tr>\n';
}

console.log(output);
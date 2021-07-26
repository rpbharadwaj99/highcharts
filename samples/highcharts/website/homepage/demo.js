let demoChart;

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const baseColor = 'rgba(72,72,72,.2)';
const networklinkColor = '#000';
const baseTextColor = '#fff';
const axisColor = '#333';
const streamLine = '#ebebeb';
let currentTimeout;

const colors = Highcharts.getOptions().colors;

let section = 2;

//HERO CHART
Math.easeOutQuint = function (pos) {
    return (Math.pow((pos - 1), 5) + 1);
};


const fakeData = [
    { x: Date.UTC(1844, 7, 1), y: 20 },
    { x: Date.UTC(1848, 7, 1), y: 20 },
    { x: Date.UTC(1852, 7, 1), y: 20 },
    { x: Date.UTC(1856, 7, 1), y: 20 },
    { x: Date.UTC(1860, 7, 1), y: 20 },
    { x: Date.UTC(1864, 7, 1), y: 20 },
    { x: Date.UTC(1868, 7, 1), y: 20 },
    { x: Date.UTC(1872, 7, 1), y: 20 },
    { x: Date.UTC(1876, 7, 1), y: 20 },
    { x: Date.UTC(1880, 7, 1), y: 20 },
    { x: Date.UTC(1884, 7, 1), y: 20 },
    { x: Date.UTC(1888, 7, 1), y: 20 },
    { x: Date.UTC(1892, 7, 1), y: 20 },
    { x: Date.UTC(1896, 7, 1), y: 20 },
    { x: Date.UTC(1900, 7, 1), y: 20 },
    { x: Date.UTC(1904, 7, 1), y: 20 },
    { x: Date.UTC(1908, 7, 1), y: 20 },
    { x: Date.UTC(1912, 7, 1), y: 20 },
    { x: Date.UTC(1912, 7, 1), y: 20 },
    { x: Date.UTC(1916, 7, 1), y: 20 },
    { x: Date.UTC(1920, 7, 1), y: 20 },

    ///1924
    { x: -1449014400000, y: 20 },
    { x: -1322784000000, y: 20 },
    { x: -1196553600000, y: 20 },
    { x: -1070323200000, y: 20 },
    { x: -944092800000, y: 20 },
    { x: -817862400000, y: 20 },
    { x: -691632000000, y: 20 },
    { x: -565401600000, y: 20 },
    { x: -439171200000, y: 20 },
    { x: -312940800000, y: 20 },
    { x: -186710400000, y: 20 },
    { x: -60480000000, y: 20 },
    { x: 78847528000, y: 20 },
    { x: 191980800000, y: 20 },
    { x: 318211200000, y: 20 },
    { x: 444441600000, y: 20 },
    { x: 570672000000, y: 20 },
    //1992
    { x: 696902400000, y: 20 },
    //1994
    { x: 773072624000, y: 20 },
    { x: 899303024000, y: 20 },
    { x: 1025533424000, y: 20 },
    { x: 1151763824000, y: 20 },
    { x: 1277994224000, y: 20 },
    { x: 1404224624000, y: 20 },
    { x: 1580515200000, y: 20 }
];

const streamSeries = [{
    name: "Finland",
    data:
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 4, 3,
        6, 0, 0, 6, 9, 7, 8, 10, 5, 5, 7, 9, 13, 7, 7, 6, 12, 7, 9, 5, 5]
}, {
    name: "Austria",
    data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4,
        2, 4, 0, 0, 8, 8, 11,
        6, 12, 11, 5, 6, 7, 1, 10, 21, 9, 17, 17, 23, 16, 17
    ]
}, {
    name: "Sweden",
    data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5,
        3, 7, 0, 0, 10, 4,
        10, 7, 7, 8, 4, 2, 4, 8, 6, 4, 3, 3, 7, 14, 11, 15
    ]
}, {
    name: "Norway",
    data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17,
        15, 10, 15, 0, 0, 10,
        16, 4, 6, 15, 14, 12, 7, 10, 9, 5, 20, 26, 25, 25, 19, 23, 26
    ]
}, {
    name: "U.S.",
    data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 6,
        12, 4, 0, 0, 9, 11,
        7, 10, 7, 7, 8, 10, 12, 8, 6, 11, 13, 13, 34, 25, 37, 28
    ]
}, {
    name: "East Germany", //0, 0, 5, 14, 19, 23, 24, 25, 0, 0, 0, 0, 0, 0, 0
    data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
}, {
    name: "West Germany",
    data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 7, 5, 10, 5, 4, 8, 0, 0, 0, 0, 0, 0, 0
    ]
}, {
    name: "Germany",
    data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 6, 0, 0, 0, 7, 2,
        8, 9, 0, 0, 0, 0, 0, 0, 26, 24, 29, 36, 29, 30, 19
    ]
}, {
    name: "Netherlands",
    data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0,
        2, 2, 9, 9, 6, 4, 0, 7, 4, 4, 11, 8, 9, 8, 24
    ]
}, {
    name: "Italy",
    data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 2, 3,
        1, 4, 4, 5, 4, 2, 2, 5, 14, 20, 10, 13, 11, 5, 8
    ]
}, {
    name: "Canada",
    data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 7, 1, 0, 0, 3, 2, 3,
        4, 3, 3, 1, 3, 2, 4, 5, 7, 13, 15, 17, 24, 26, 25
    ]
}, {
    name: "Switzerland",
    data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        1, 1, 3, 0, 0, 10, 2, 6,
        2, 0, 6, 10, 5, 5, 5, 15, 3, 9, 7, 11, 14, 9, 11
    ]
}, {
    name: "Great Britain",
    data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        1, 0, 3, 0, 0, 2, 1, 0,
        0, 1, 0, 0, 1, 1, 1, 0, 0, 2, 1, 2, 1, 1, 4
    ]
}, {
    name: "France",
    data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        1, 1, 1, 0, 0, 5, 1, 0,
        3, 7, 9, 3, 1, 1, 3, 2, 9, 5, 8, 11, 9, 11, 15
    ]
}];

const streamDataArrays = [];

function addDates() {
    for (let ii = 0; ii < streamSeries.length; ++ii) {
        const tempArray = [];
        const data = streamSeries[ii].data;
        for (let kk = 0; kk < data.length; ++kk) {
            const xData = fakeData[kk].x;
            const yData = data[kk];
            tempArray.push({ x: xData, y: yData });
        }
        streamDataArrays.push(tempArray);
    }
}
addDates();

// const categories =  {
//     1844: { label: '' },
//     1848: { label: '' },
//     1852: { label: '' },
//     1856: { label: '' },
//     1860: { label: '' },
//     1864: { label: '' },
//     1868: { label: '' },
//     1872: { label: '' },
//     1876: { label: '' },
//     1880: { label: '' },
//     1884: { label: '' },
//     1888: { label: '' },
//     1892: { label: '' },
//     1896: { label: '' },
//     1900: { label: '' },
//     1904: { label: '' },
//     1908: { label: '' },
//     1912: { label: '' },
//     1916: { label: '' },
//     1920: { label: '' },

//     1924: { label: '1924 Chamonix' },
//     1928: { label: '1928 St. Moritz' },
//     1932: { label: '1932 Lake Placid' },
//     1936: { label: '1936 Garmisch-Partenkirchen' },
//     1940: { label: '1940 <i>Cancelled (Sapporo)</i>' },
//     1944: { label: '1944 <i>Cancelled (Cortina d\'Ampezzo)</i>' },
//     1948: { label: '1928 St. Moritz' },
//     1952: { label: '1952 Oslo' },
//     1956: { label: '1956 Cortina d\'Ampezzo' },
//     1960: { label: '1960 Squaw Valley' },
//     1964: { label: '1964 Innsbruck' },
//     1968: { label: '1968 Grenoble' },
//     1972: { label: '1972 Sapporo' },
//     1976: { label: '1976 Innsbruck' },
//     1980: { label: '1980 Lake Placid' },
//     1984: { label: '1984 Sarajevo' },
//     1988: { label: '1988 Calgary' },
//     1992: { label: '1992 Albertville' },
//     1994: { label: '1994 Lillehammer' },
//     1998: { label: '1998 Nagano' },
//     2002: { label: '2002 Salt Lake City' },
//     2006: { label: '2006 Turin' },
//     2010: { label: '2010 Vancouver' },
//     2014: { label: '2014 Sochi' },
//     2016: { label: '' },
//     2020: { label: '' }
// };


// const splineSeries = [
//     {
//         type: 'line',
//         name: 'Spain',
//         label: {
//             enabled: false
//         },
//         lineWidth: 0,
//         marker: {
//             enabled: false

//         },
//         showInLegend: false,
//         dashStyle: 'dash',
//         xAxis: 2,
//         yAxis: 2,
//         data:
//         [
//             { x: Date.UTC(2021, 1, 8), y: 7.9 },
//             { x: Date.UTC(2021, 1, 10), y: 10.9 }
//         ],
//         zIndex: 10
//     },
//     {
//         type: 'line',
//         name: 'France',
//         marker: {
//             enabled: false
//         },
//         label: {
//             enabled: false
//         },
//         showInLegend: false,
//         dashStyle: 'dotdash',
//         xAxis: 2,
//         yAxis: 2,
//         data: [
//             { x: 8.2, y: 7.9 },
//             { x: 8.5, y: 9.5 }
//         ],
//         zIndex: 10
//     },
//     {
//         type: 'line',
//         name: 'Poland',
//         marker: {
//             enabled: false
//         },
//         label: {
//             enabled: false
//         },
//         showInLegend: false,
//         dashStyle: 'dotdash',
//         xAxis: 2,
//         yAxis: 2,
//         data: [
//             { x: 8.2, y: 7.8 },
//             { x: 8.5, y: 8 }
//         ],
//         zIndex: 10
//     },
//     {
//         type: 'line',
//         name: 'CR',
//         marker: {
//             enabled: false
//         },
//         label: {
//             enabled: false
//         },
//         showInLegend: false,
//         dashStyle: 'dotdash',
//         xAxis: 2,
//         yAxis: 2,
//         data: [
//             { x: 8.2, y: 7.8 },
//             { x: 8.6, y: 6.8 }
//         ],
//         zIndex: 10
//     },
//     {
//         type: 'line',
//         name: 'Italy',
//         marker: {
//             enabled: false
//         },
//         label: {
//             enabled: false
//         },
//         showInLegend: false,
//         dashStyle: 'dotdash',
//         xAxis: 2,
//         yAxis: 2,
//         data: [
//             { x: 8.3, y: 7.5 },
//             { x: 8.6, y: 5.2 }
//         ],
//         zIndex: 10
//     },
//     {
//         type: 'line',
//         name: 'Swiss',
//         marker: {
//             enabled: false
//         },
//         label: {
//             enabled: false
//         },
//         showInLegend: false,
//         dashStyle: 'dotdash',
//         xAxis: 2,
//         yAxis: 2,
//         data: [
//             { x: 8.2, y: 7.8 },
//             { x: 8.3, y: 4 }
//         ],
//         zIndex: 10
//     }

// ];

//for the last chart in the animation (science)
const dataSource = [93, 93, 96, 100, 101, 102, 102];
const xiData = [];
const range = 20;
const startPoint = 88;
for (let i = 0; i < range; i++) {
    xiData[i] = startPoint + i;
}

const dataOrigine = [];
for (let i = 0; i < dataSource.length; i++) {
    dataOrigine.push([dataSource[i], 0]);
}

const dataPoint = [];
for (let i = 0; i < dataSource.length; i++) {
    dataPoint.push([dataSource[i], 0]);
}

let gData = [];

function GaussKDE(xi, x) {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(Math.pow(xi - x, 2) / -2);
}

const N = dataSource.length;
const kernelChart = [];
const kernel = [];

//Create the density estimate
for (let i = 0; i < xiData.length; i++) {
    let temp = 0;
    kernel.push([]);
    kernel[i].push(new Array(dataSource.length));
    for (let j = 0; j < dataSource.length; j++) {
        temp = temp + GaussKDE(xiData[i], dataSource[j]);
        kernel[i][j] = GaussKDE(xiData[i], dataSource[j]);
    }
    gData.push([xiData[i], (1 / N) * temp]);
}

let startNum = 60;
const tempArray = [];
for (let rr = 0; rr < 20; ++rr) {
    tempArray.push([startNum, 0]);
    startNum = startNum + 1;
}

gData = tempArray.concat(gData);

//Create the kernels
for (let i = 0; i < dataSource.length; i++) {
    kernelChart.push([]);
    kernelChart[i].push(new Array(kernel.length));
    for (let j = 0; j < kernel.length; j++) {
        kernelChart[i].push([xiData[j], (1 / N) * kernel[j][i]]);
    }
}

const kernelSeries = [
    {
        type: 'scatter',
        name: 'Observation',
        marker: {
            enabled: true,
            radius: 5,
            symbol: 'circle',
            fillColor: Highcharts.getOptions().colors[5],
            showInLegend: false
        },
        data: dataPoint,
        tooltip: {
            headerFormat: '{series.name}:',
            pointFormat: '<b>{point.x}</b>'
        },
        zIndex: 52,
        showInLegend: false
    },
    {
        name: 'KDE',
        type: 'spline',
        className: 'kernel-1',
        xAxis: 5,
        yAxis: 4,
        data: gData,
        showInLegend: false
    },
    {
        name: 'k(' + dataSource[0] + ')',
        data: kernelChart[0],
        className: 'kernel',
        type: 'spline',
        xAxis: 5,
        yAxis: 4,
        showInLegend: false
    },
    {
        name: 'k(' + dataSource[1] + ')',
        data: kernelChart[1],
        className: 'kernel',
        type: 'spline',
        xAxis: 5,
        yAxis: 4,
        showInLegend: false
    },
    {
        name: 'k(' + dataSource[2] + ')',
        data: kernelChart[2],
        className: 'kernel',
        type: 'spline',
        xAxis: 5,
        yAxis: 4,
        showInLegend: false
    },
    {
        name: 'k(' + dataSource[3] + ')',
        data: kernelChart[3],
        className: 'kernel',
        type: 'spline',
        xAxis: 5,
        yAxis: 4,
        showInLegend: false
    },
    {
        name: 'k(' + dataSource[4] + ')',
        data: kernelChart[4],
        className: 'kernel',
        type: 'spline',
        xAxis: 5,
        yAxis: 4,
        showInLegend: false
    },
    {
        name: 'k(' + dataSource[5] + ')',
        data: kernelChart[5],
        className: 'kernel',
        type: 'spline',
        xAxis: 5,
        yAxis: 4,
        showInLegend: false
    },
    {
        name: 'k(' + dataSource[6] + ')',
        data: kernelChart[6],
        className: 'kernel',
        type: 'spline',
        xAxis: 5,
        yAxis: 4,
        showInLegend: false

    }];

const variablePieData = [
    { //0
        name: 'Spain',
        y: 505370,
        z: 92.9,
        className: 'item-1'
    }, { //1
        name: 'France',
        y: 551500,
        z: 218.7,
        className: 'item-2'
    }, { //2
        name: 'Poland',
        y: 312685,
        z: 124.6,
        className: 'item-3'
    }, { //3
        name: 'Czech Republic',
        y: 78867,
        z: 137.5,
        className: 'item-4'
    }, { //4
        name: 'Italy',
        y: 301340,
        z: 201.8,
        className: 'item-5'
    }, { //5
        name: 'Switzerland',
        y: 41277,
        z: 214.5,
        className: 'item-6'
    }, { //6
        name: 'Germany',
        y: 357022,
        z: 235.6,
        className: 'item-7'
    },
    { //7

        y: 1357022,
        z: 235.6,
        className: 'item-8'
    }

];

//homepage chart animation chart
/****************************************/
///Section 4 Network graph

function section4() {

    for (let ii = 1; ii <= 6; ++ii) {
        $('.item-' + ii).removeClass('out');
        $('.item-' + ii).addClass('float');
    }

    $('.particles').removeClass('stream');
    $('.particles').addClass('float');
    $('.highcharts-series-0').show();

    clearTimeout(currentTimeout);

    ///shows the networkgraph, sets up the splines,
    //shows new title and tab
    const p1 = function () {
        ///don't show network graph for accessibility
        if (!reduced) {
            $('.highcharts-spline-series').hide();
            $('.highcharts-scatter-series').hide();
            $('.water').css({ opacity: 1 });
        }
    };
    currentTimeout = window.setTimeout(p1, 100);

    const p11 = function () {
        demoChart.series[3].nodes[0].update({
            mass: 10
        });
    };
    currentTimeout = window.setTimeout(p11, 200);

    const p12 = function () {
        // let move = setInterval(function(){
        demoChart.series[3].nodes[0].update({
            mass: 100,
            plotX: -2010
        });
        $('.highcharts-networkgraph-series').fadeIn(500);
    };
    currentTimeout = window.setTimeout(p12, 1000);

    const p13 = function () {
        $('.highcharts-series-label.kernel').css({ opacity: 1 });
        $('.highcharts-spline-series').fadeIn(100);
        $('.highcharts-scatter-series').fadeIn(100);
        // $('.highcharts-legend').fadeIn();
        demoChart.xAxis[5].setExtremes(78, 107);
    };
    currentTimeout = window.setTimeout(p13, 3000);

    //moves the node on the network graph
    const p2 = function () {
        ///don't show for accessibility
        if (!reduced) {
            demoChart.series[3].nodes[0].update({
                plotX: demoChart.chartWidth / 2 + 1000,
                plotY: demoChart.chartHeight
            });
        }
    };
    currentTimeout = window.setTimeout(p2, 500);

    //shows the splines
    const p25 = function () {
        ///don't show the splines now for accessibility
        if (!reduced) {
            $('.highcharts-spline-series').fadeIn(100);
            $('.highcharts-scatter-series').fadeIn(100);
            $('.highcharts-legend').fadeIn();
        }
        demoChart.series[19].update({ color: '#1E90FF' });
    };
    currentTimeout = window.setTimeout(p25, 1000);

    //moves the node again
    const p3 = function () {
        ///only do the network stuff for the full animation
        if (!reduced) {
            demoChart.update({
                chart: {
                    animation: {
                        duration: 1000
                    }
                }
            });
            demoChart.series[3].nodes[0].update({
                mass: 1,
                plotX: demoChart.series[3].nodes[1].plotX,
                plotY: demoChart.series[3].nodes[1].plotY

            });

            demoChart.xAxis[5].setExtremes(78, 107);
        }
    };


    currentTimeout = window.setTimeout(p3, 2000);

    const p31 = function () {
        if (reduced) {
            top.window.endAnimation();
        }
    };
    currentTimeout = window.setTimeout(p31, 4500);
}
/****************************************/
////Section 3 Streamgraph

function section3() {
    const s1 = function () {

        ///set up the particles fro the streamgraph
        $('.particles').removeClass('capture');
        $('.particles').removeClass('stock');
        $('.particles').addClass('stream');

        ///removes "stream" class from particles, adds "out"
        ///"out" positions the particles for flying into the mouth
        ///then animates the particles
        let count = 0;
        const particles = setInterval(function () {
            if (count < 7) {
                $('.particles .item-' + count).removeClass('leave');
                $('.particles .item-' + count).removeClass('stream');
                $('.particles .item-' + count).removeClass('stock');
                $('.particles .item-' + count).removeClass('hop');
                $('.particles .item-' + count).addClass('out');
                count = count + 1;
            } else {
                clearInterval(particles);
            }
        }, 10);

        //hide the streamgraph, since the axis change causes
        ///it to show
        $('.highcharts-streamgraph-series').hide();

        ///show the item series for the particles
        $('.highcharts-series-0').show();
        ///hide the dark blue hole (part of the item series)
        $('.highcharts-item-series .item-7').hide();
        $('.highcharts-item-series .highcharts-color-0').hide();

    };
    currentTimeout = window.setTimeout(s1, 0);

    const s11 = function () {

        ///show the axis for the stream series
        demoChart.xAxis[4].update({
            visible: true
        });
        demoChart.update({
            chart: {
                marginBottom: 30
            }
        });


        ///shows the enitre streamgraph
        let maxYear = 1880;
        if (demoChart.chartWidth < 700) {
            maxYear = 1930;
        }
        demoChart.xAxis[4].setExtremes(Date.UTC(maxYear, 7, 1)
            , Date.UTC(2016, 11, 1));

        ///fade in the stremagraph and the particles
        $('.highcharts-streamgraph-series').fadeIn(600);
    };
    currentTimeout = window.setTimeout(s11, 500);

    const s2 = function () {
        ///opens the "mouth" in the streamgraph
        //33-44
        const newYs = [5, 14, 19, 23, 24, 25, 40, 50, 51, 52, 53, 54];
        let count = 33;
        const stop = 44;
        const mouth = setInterval(function () {
            if (count <= stop) {
                demoChart.series[10].points[count].update({
                    y: newYs[count - 33]
                });
                count = count + 1;
            } else {
                $('.particles').parent().css({ overflow: 'visible' });
                clearInterval(mouth);
            }
        }, 100);
        $('.particles').css({ opacity: 1, transition: 'all 1s' });
    };
    currentTimeout = window.setTimeout(s2, 2000);

    const s4 = function () {
        let count = 1;
        const arc = setInterval(function () {
            if (count < 7) {
                $('.particles .item-' + count).addClass('arc');
                count = count + 1;
            } else {
                clearInterval(arc);
            }
        }, 100);
    };
    currentTimeout = window.setTimeout(s4, 2500);


    const s41 = function () {
        ///fills in the streamgraph, after consuming the particles
        for (let ii = 1; ii <= 12; ++ii) {
            $('.stream-' + ii + ' .highcharts-area').animate({ opacity: 1 }, 1000);
        }
    };
    currentTimeout = window.setTimeout(s41, 4000);

    const s42 = function () {

        ///shows the axis labels and annotations
        $('.highcharts-axis-labels').fadeIn(100);
        $('.highcharts-annotation-label').fadeIn(100);

        for (let ii = 39; ii <= 44; ++ii) {
            demoChart.series[10].points[ii].update({
                y: 0
            });
        }
    };
    currentTimeout = window.setTimeout(s42, 5200);

    const s43 = function () {
        $('.highcharts-series-label').animate({ opacity: 1 }, 1000);
    };
    currentTimeout = window.setTimeout(s43, 6500);

    const s5 = function () {
        ///hides the annotations
        $('.highcharts-annotation-label').hide();

        ///fades out most of the streamgraphs
        ///keep some for the sky and ocean for section 4
        for (let ii = 1; ii <= 12; ++ii) {
            if (ii < 3 || ii > 6) {
                $('.stream-' + ii + ' .highcharts-area').animate({ opacity: 0 }, 1000);
            } else {
                $('.stream-' + ii + ' .highcharts-area').animate({ opacity: 0.4 }, 1000);
            }
        }
    };
    currentTimeout = window.setTimeout(s5, 9000);

    const s51 = function () {
        ///hides the series labels
        $('.highcharts-series-label').css({ opacity: 0 });
    };
    currentTimeout = window.setTimeout(s51, 9200);

    const s52 = function () {
        demoChart.update({
            chart: {
                animation: {
                    duration: 2000
                }
            }
        });
        ///hies the streamgraph axis
        demoChart.xAxis[4].update({
            visible: false
        });
        ///sets the extremes on the streamgraph axis
        demoChart.xAxis[4].setExtremes(Date.UTC(2000, 7, 1),
            Date.UTC(2016, 11, 1));

        ///hides the irrelevant streamgraph series
        for (let ii = 5; ii <= 17; ++ii) {
            if (ii < 6 || ii > 9) {
                demoChart.series[ii].hide();
            }
        }
        for (let ii = 2; ii <= 4; ++ii) {
            $('.stream-' + ii + ' .highcharts-area').css({ opacity: 0.4 });
        }
        section4();
    };
    currentTimeout = window.setTimeout(s52, 9500);
}
/****************************************/
////Section 2 Candlestick

function section2() {
    const f3 = function () {
        ///show the axis
        demoChart.xAxis[0].update({
            visible: true
        });
        ///make room for the axis
        demoChart.update({
            chart: {
                marginBottom: 30
            }
        });

        ///get the tooltip ready
        demoChart.tooltip.refresh(
            [demoChart.series[2].points[4]]);
        //immediately hide the tooltip since it's been update
        $('.highcharts-tooltip').hide();

        ///fade the tooltip in ONE
        // $('.highcharts-tooltip').fadeIn();

        ///show the candlestick
        $('.highcharts-candlestick-series').css({ opacity: 1 });

        $('.particles').removeClass('capture');
        $('.particles').addClass('stock');
        for (let ii = 1; ii <= 6; ++ii) {
            $('.particles .item-' + ii).addClass('stock');
            $('.particles .item-' + ii).removeClass('leave');
            $('.particles .item-' + ii).removeClass('hole');
        }

        demoChart.xAxis[0].setExtremes(
            Date.UTC(2020, 0, 0), Date.UTC(2020, 4, 0));

    };
    currentTimeout = setTimeout(f3, 1000);

    const f4 = function () {
        ///get the tooltip ready
        let pointToShow = 4;
        if (demoChart.chartWidth >= 992) {
            pointToShow = 1;
        }
        $('.highcharts-tooltip').css({ transform: 'translate(565px, -50px)' });

        demoChart.tooltip.refresh(
            [demoChart.series[2].points[pointToShow]]);
        //immediately hide the tooltip since it's been update
        $('.highcharts-tooltip').hide();
        $('.infoGrid').css({ marginTop: '45px' });
        $('#candlestick .marker').removeClass('marker-1');
        $('#candlestick .marker').addClass('marker-2');
        demoChart.xAxis[0].setExtremes(
            Date.UTC(2020, 0, 0), Date.UTC(2020, 0, 15));
    };
    currentTimeout = setTimeout(f4, 3000);

    const f411 = function () {
        ///fade the tooltip in TWO
        $('.highcharts-tooltip').fadeIn();
    };
    currentTimeout = setTimeout(f411, 3500);

    const f4112 = function () {
        // let moveBy = 100;
        // if(demoChart.chartWidth >=992){
        //     moveBy = 740;
        // }
        $('.highcharts-tooltip').fadeOut();
        //set the axis for the custom group
        demoChart.xAxis[0].setExtremes(
            Date.UTC(2020, 0, 0), Date.UTC(2020, 0, 5));
        demoChart.yAxis[0].setExtremes(290, 360);
        // $('.highcharts-tooltip').css({transform:'translateX(' + moveBy + 'px)',transition:'all 2s'});
    };
    currentTimeout = setTimeout(f4112, 5500);

    const f412 = function () {

        ///get the tooltip ready
        demoChart.tooltip.refresh(
            [demoChart.series[2].points[2]]);
        //immediately hide the tooltip since it's been update
        $('.highcharts-tooltip').hide();

        $('.infoGrid').css({ marginTop: '35px' });
        $('#candlestick .marker').removeClass('marker-1');
        $('#candlestick .marker').removeClass('marker-2');
        $('#candlestick .marker').addClass('marker-3');


        //$('.highcharts-data-labels.highcharts-series-0').css({ display: 'block' });
        $('.highcharts-tooltip').css({ transform: 'translateX(230px)' });
        $('#candlestick').css({ transform: 'translateX(-190px)' });
        $('.particles').parent().css({ overflow: 'visible' });
    };
    currentTimeout = setTimeout(f412, 6000);

    const f41 = function () {
        ///fade the tooltip in THREE
        // $('.highcharts-tooltip').fadeIn();
    };
    currentTimeout = setTimeout(f41, 7000);

    const f42 = function () {
        //fade out the tooltip
        $('.highcharts-tooltip').fadeOut();
        $('.particles').parent().css({ overflow: 'visible' });

        let count = 1;
        const hop = setInterval(function () {
            if (count <= 6) {
                $('.particles .item-' + count).addClass('hop');
                count = count + 1;
            } else {
                clearInterval(hop);
            }
        }, 100);
    };
    currentTimeout = setTimeout(f42, 8000);

    const f43 = function () {
        //fade out the candlestick
        $('.highcharts-series-2').fadeOut(2000);
    };
    currentTimeout = setTimeout(f43, 7800);

    const f5 = function () {
        $('.particles').css({ opacity: 0, transition: 'none' });
        demoChart.update({
            rangeSelector: {
                enabled: false
            }
        });
        section3();
    };
    currentTimeout = setTimeout(f5, 9000);

}
/****************************************/
////Section 1 Pie and item
let particleOffset, holeOffset;
function section1() {
    $('.highcharts-series-0').show();
    $('.particles').css({ opacity: 0 });

    ///ensure all the datalabels are visible
    $('.particles').parent().css({ overflow: 'visible' });
    $('.particles').parent().parent().css({ visibility: 'visible' });
    $('.particle-hole').parent().css({ overflow: 'visible' });

    ///position particles
    const s11 = function () {
        holeOffset =  $('.particle-hole').offset();
        particleOffset =  $('.particles').offset();
        console.log(particleOffset, holeOffset);
        $('.particles').css({
            left: holeOffset.left  - 120 + 'px'
        });
    };
    currentTimeout = setTimeout(s11, 100);

    const s112 = function () {
        $('.particles').animate({ opacity: 1 }, 500);
    };
    currentTimeout = setTimeout(s112, 300);

    const s12 = function () {
        ///spirals the particles into the blue hole
        let count = 0;
        let addCount = 0;
        const order = [2, 3, 6, 5, 1, 4];
        const seriesOrder = [1, 2, 5, 4, 0, 3];
        const spin = setInterval(function () {
            if (count <= 6) {
                const place = order[count];
                const series = seriesOrder[count];
                $('.particles .item-' + place).addClass('rotate');
                ////this adds points to the variable pie
                setTimeout(function () {
                    demoChart.series[4].addPoint(
                        variablePieData[series]
                    );
                    ///makes sure the particles remain visible
                    $('.particles').parent().css({ overflow: 'visible' });
                    $('.particles').parent().parent().css({ visibility: 'visible' });

                    addCount = addCount + 1;
                }, 100);
                count = count + 1;
            } else {
                clearInterval(spin);

            }
        }, 100);
    };
    currentTimeout = setTimeout(s12, 500);

    const s121 = function () {
        ///fade out the pie's text labels
        $('.pieLabel').fadeOut(100);
        for (let ii = 0; ii < demoChart.series[4].points.length; ++ii) {
            demoChart.series[4].points[ii].update({
                y: 0
            });
        }
        $('.highcharts-data-label-connector').fadeOut(100);
        ///puts the particles way left
        for (let ii = 1; ii <= 6; ++ii) {
            $('.particles .item-' + ii).addClass('hole');
            $('.particles .item-' + ii).removeClass('rotate');
        }
    };
    currentTimeout = setTimeout(s121, 3000);

    const s122 = function () {
        $('.pieLabel').fadeIn(100);
        $('.highcharts-data-label-connector').fadeIn(100);
        demoChart.series[4].update({ startAngle: 90 });
        const newYs = [505370, 551500, 312685,
            78867, 301340, 41277,  357022, 1357022];
        for (let ii = 0; ii < demoChart.series[4].points.length; ++ii) {
            demoChart.series[4].points[ii].update({
                y: newYs[ii]
            });
        }
        ///fills the pie with patterns
        $('.item-1').css({ fill: 'url(#pattern-0)' });
        $('.item-2').css({ fill: 'url(#pattern-2)' });
        $('.item-3').css({ fill: 'url(#pattern-3)' });
        $('.item-4').css({ fill: 'url(#pattern-4)' });
        $('.item-5').css({ fill: 'url(#pattern-1)' });
        $('.item-6').css({ fill: 'url(#pattern-6)' });

        ///adds a clip path to particles so they go into the hole
        $('.particles').addClass('capture');
        $('.particles').parent().css({ overflow: 'visible' });
        $('.particles').parent().parent().css({ visibility: 'visible' });


    };
    currentTimeout = setTimeout(s122, 4000);

    const s13 = function () {
        ///reduced pie slices
        demoChart.series[4].points.forEach(function (p) {
            p.update({ y: 0 });
        });
        ///fade out the pie's text labels
        $('.pieLabel').fadeOut(100);
        ///hide the variable pie
        $('.highcharts-series-4').fadeOut(1000);
    };
    currentTimeout = setTimeout(s13, 5500);

    const s123 = function () {
        // shoots the particles out the hole
        for (let ii = 1; ii <= 6; ++ii) {
            $('.particles .item-' + ii).addClass('leave');
        }
    };
    currentTimeout = setTimeout(s123, 7000);

    const s131 = function () {
        ///shrink the hole
        $('.particle-hole').css({ animation: 'pie-shrink 1s forwards 1' });
    };
    currentTimeout = setTimeout(s131, 7500);

    const s133 = function () {
        section = 2;
        section2();
    };
    currentTimeout = setTimeout(s133, 9000);
}


const heroChart = {
    chart: {
        backgroundColor: 'transparent',
        styledMode: true,
        style: {
            fontFamily: 'Arial',
            color: baseTextColor,
            fontSize: '18px'
        },
        spacing: [0, 0, 0, 0],
        margin: [0, 0, 0, 0],
        animation: {
            easing: 'easeOutQuint',
            duration: 1000,
            enabled: true
        },
        events: {
            load: function () {
                demoChart = this;
                const ren = this.renderer;
                const cWidth = demoChart.chartWidth;
                let radius = 43;
                let circleX = cWidth / 2;
                let circleY = 363;
                if (section === 1) {
                    if (cWidth <= 300) {
                        radius = 30;
                    } else if (cWidth >= 500 && cWidth < 730) {
                        radius = 50;
                    } else if (cWidth >= 730) {
                        radius = 57;
                        circleY = 365;
                    }
                    if (cWidth >= 992 && cWidth < 1100) {
                        circleX = (cWidth / 1.443);
                    } else if (cWidth >= 1100) {
                        circleX = (cWidth / 1.45);
                    }
                    ren.circle(circleX, circleY, radius)
                        .attr({
                            fill: '#000',
                            stroke: '#000',
                            strokeWidth: 1,
                            class: 'particle-hole'
                        })
                        .add();
                }
                demoChart.update({
                    chart: {
                        animation: {
                            easing: 'easeOutQuint',
                            duration: 1000
                        }
                    }
                });
                $('.highcharts-networkgraph-series').hide();
                $('.highcharts-series-0').hide();
                // $('.highcharts-candlestick-series').hide();
                $('.highcharts-spline-series').hide();
                $('.highcharts-scatter-series').hide();
                $('.highcharts-streamgraph-series').hide();
                $('.highcharts-annotation-label').hide();

                // demoChart.series[3].nodes[0].update({
                //     plotX: 600, plotY: 200
                // });

                if (demoChart.chartWidth < 700) {
                    demoChart.yAxis[3].setExtremes(-50, 150);
                }

                section1();
            },
            redraw: function () {
                $('.particles').parent().css({ overflow: 'visible' });
                $('.particles').parent().parent().css({ visibility: 'visible' });
                $('.particle-hole').parent().css({ overflow: 'visible' });
                if (section === 1) {
                    $('.particle-hole').remove();
                    demoChart = this;
                    const ren = this.renderer;
                    const cWidth = demoChart.chartWidth;
                    let radius = 43;
                    let circleX = cWidth / 2;
                    let circleY = 363;

                    if (cWidth <= 300) {
                        radius = 30;
                    } else if (cWidth >= 500 && cWidth < 730) {
                        radius = 50;
                    } else if (cWidth >= 730) {
                        radius = 57;
                        circleY = 365;
                    }
                    if (cWidth >= 992 && cWidth < 1100) {
                        circleX = (cWidth / 1.443);
                    } else if (cWidth >= 1100) {
                        circleX = (cWidth / 1.45);
                    }

                    ren.circle(circleX, circleY, radius)
                        .attr({
                            fill: '#000',
                            stroke: '#000',
                            strokeWidth: 1,
                            class: 'particle-hole'
                        })
                        .add();
                    holeOffset =  $('.particle-hole').offset();
                    particleOffset =  $('.particles').offset();
                    $('.particles').css({
                        left: holeOffset.left  - 120 + 'px'
                    });
                }
            }
        }
    },
    stockTools: {
        gui: {
            enabled: false
        }
    },
    navigation: {
        annotationsOptions: {
            visible: false
        }
    },
    title: {
        floating: true,
        x: 250,
        y: 90,
        text: '',
        style: {
            fontSize: 16,
            color: baseTextColor,
            fontWeight: 'bold'
        }
    },
    credits: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    rangeSelector: {
        enabled: false,
        dropdown: 'never',
        inputEnabled: false,
        floating: true,
        buttonSpacing: 46,
        y: 0,
        zIndex: 50,
        buttonPosition: {
            align: 'center'
        },
        buttons: [{
            type: 'month',
            count: 2,
            text: 'Months',
            title: 'View 2 months'
        }, {
            type: 'week',
            count: 5,
            text: 'Weeks',
            title: 'View 5 weeks'
        }, {
            type: 'hour',
            count: 120,
            text: 'Days',
            title: 'View 5 days'
        }]
    },
    navigator: {
        enabled: false
    },
    scrollbar: {
        enabled: false
    },
    tooltip: {
        enabled: true,
        useHTML: true,
        borderRadius: 10,
        padding: 0,
        shadow: true,
        formatter: function () {
            const date = new Date(this.points[0].point.x);
            let dateString = date.toString();
            dateString = dateString.substr(0, 16);
            const string =
            `<div id="tooltipGrid">
                <div id="crosshair"></div>
                <div id="candlestick">
                    <div class="date" >${dateString}</div>
                    <div class="marker marker-1">
                        <div class="stem-up">
                            <div class="data high">
                            <span><i class="fas fa-arrow-up"></i> High</span>
                            ${this.points[0].point.high}
                            </div>
                        </div>
                        <div class="box"></div>
                        <div class="stem-down">
                        </div>
                        <div class="data low">
                            <span><i class="fas fa-arrow-down"></i> Low</span>
                            ${this.points[0].point.low}
                        </div>
                    </div>
                    <div class="infoGrid">
                        <div class="label open">
                            <i class="far fa-circle"></i> Open
                        </div>
                        <div class="data open">
                            ${this.points[0].point.open}
                        </div>
                        <div class="label close">
                        <i class="fas fa-circle"></i> Close
                        </div>
                        <div class="data close">
                            ${this.points[0].point.close}
                        </div>
                    </div>
                 </div>
                </div>
                `;
            return string;
        }

    },
    xAxis: [
    ///0
        {
            visible: false,
            type: 'datetime',
            min: Date.UTC(1970, 0, 0),
            max: Date.UTC(2020, 4, 0),
            reversed: false,
            events: {
                afterSetExtremes: function () {
                    $('.highcharts-candlestick-series .highcharts-point-up').css({ filter: 'none', opacity: 0.8 });
                }
            }
        },
        ///1
        {
            type: 'datetime',
            min: Date.UTC(2002, 11, 8),
            max: Date.UTC(2020, 3, 1),
            visible: false,
            labels: {
                style: {
                    color: axisColor
                }
            }
        },
        ///2
        {
            visible: false,
            tickInterval: 1,
            startOnTick: false,
            // endOnTick: false,
            min: Date.UTC(2021, 1, 1),
            max: Date.UTC(2021, 1, 12),
            labels: {
                style: {
                    color: axisColor
                }
            }
        },
        ///3
        {
            type: 'datetime',
            min: Date.UTC(1990, 1, 1),
            max: Date.UTC(2020, 1, 1),
            floating: true,
            visible: false,
            labels: {
                style: {
                    color: axisColor
                }
            }
        },
        ///4
        {
            type: 'datetime',
            visible: false,
            lineColor: 'transparent',
            tickColor: 'transparent',
            verticalAlign: 'middle',
            min: Date.UTC(1980, 7, 1),
            max: Date.UTC(2016, 7, 1),
            // tickPositions:xTicks,
            labels: {
                align: 'left',
                reserveSpace: false,

                style: {
                    color: 'transparent',
                    fontSize: '10px'
                },
                formatter: function () {
                    const year = new Date(this.pos).getFullYear();
                    if (this.pos >= Date.UTC(1921, 7, 1)) {
                        return year;
                    }
                }
            }
        },
        ///5
        {
            visible: false,
            min: 60,
            max: 70,
            labels: {
                style: {
                    color: '#333',
                    fontSize: 11
                }
            }
        },
        ///6
        {
            visible: false,
            startOnTick: false,
            endOnTick: false,
            type: 'linear',
            min: 60,
            max: 73,
            labels: {
                style: {
                    color: '#333',
                    fontSize: 11
                }
            }
        }
    ],
    yAxis: [
    ///0
        {
            visible: false,
            min: 250, ///250,
            max: 400, //400,
            tickInterval: 1,
            startOnTick: false,
            gridLineColor: 'transparent',
            labels: {
                style: {
                    color: axisColor
                },
                title: {
                    text: 'yAxis 0',
                    style: {
                        color: axisColor
                    }
                }
            }
        },
        ///1
        {
            visible: false,
            gridLineColor: 'transparent',
            min: -30,
            max: 40,
            labels: {
                style: {
                    color: axisColor
                }
            },
            startOnTick: true,
            endOnTick: true
        },
        ///2
        {
            visible: false,
            min: 0,
            max: 20,
            startOnTick: false,
            endOnTick: false,
            tickInterval: 1,
            labels: {
                style: {
                    color: '#fff'
                }
            }
        },
        ///3
        {
            visible: false,
            min: -50,
            max: 50,
            labels: {
                style: {
                    color: axisColor
                }
            }
        },
        ////4
        {
            visible: false,
            max: 0.33,
            min: 0,
            labels: {
                style: {
                    color: axisColor,
                    fontSize: 12
                }
            }

        },
        {
            visible: false
        }
    ],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 400
            },
            chartOptions: {
                plotOptions: {
                    item: {
                        center: ['21%', '80%']
                    },
                    variablepie: {
                        dataLabels: {
                            distance: 0
                        },
                        center: ['50%', '52%'],
                        size: '70%'
                    }
                }
            }
        },
        {
            condition: {
                minWidth: 401
            },
            chartOptions: {
                plotOptions: {
                    item: {
                        center: ['67.5%', '64.5%']
                    },
                    variablepie: {
                        dataLabels: {
                            distance: 0
                        },
                        center: ['50%', '52%'],
                        size: '60%'
                    }
                }
            }
        },
        {
            condition: {
                minWidth: 550
            },
            chartOptions: {
                plotOptions: {
                    item: {
                        center: ['67.5%', '64.5%']
                    },
                    variablepie: {
                        dataLabels: {
                            distance: 0
                        },
                        center: ['50%', '52%'],
                        size: '55%'
                    }
                }
            }
        },
        {
            condition: {
                minWidth: 650
            },
            chartOptions: {
                plotOptions: {
                    item: {
                        center: ['67.5%', '64.5%']
                    },
                    variablepie: {
                        dataLabels: {
                            distance: 20
                        },
                        center: ['50%', '52.5%'],
                        size: '50%'
                    }
                }
            }
        },
        {
            condition: {
                minWidth: 950
            },
            chartOptions: {
                plotOptions: {
                    item: {
                        center: ['67.5%', '64.5%']
                    },
                    variablepie: {
                        dataLabels: {
                            distance: 20
                        },
                        center: ['70%', '52.5%'],
                        size: '50%'
                    }
                }
            }
        },
        {
            condition: {
                maxWidth: 700
            },
            chartOptions: {
                rangeSelector: {
                    x: -100
                }
            }
        },
        {
            condition: {
                minWidth: 701
            },
            chartOptions: {
                rangeSelector: {
                    x: 0
                }
            }
        }
        ]
    },
    legend: {
        enabled: true,
        floating: true,
        x: 300,
        y: -10,
        width: 500,
        style: {
            fontSize: "16px"
        },
        labelFormat: '{label} <span style="opacity: 0.4">{y}</span>'
    },
    annotations: [{
        visible: true,
        labels: [
            {

                point: {
                    x: Date.UTC(1944, 7, 1),
                    xAxis: 4,
                    y: 10,
                    yAxis: 3
                },

                text: 'Cancelled during World War II',
                zIndex: 30
            },
            {
                point: {
                    x: Date.UTC(1992, 7, 1),
                    xAxis: 4,
                    y: 10,
                    yAxis: 3
                },
                text: 'Soviet Union fell,<br>Germany united'
            }],
        labelOptions: {
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 7,
            borderColor: '#211836',
            borderWidth: 3,
            style: {
                fontSize: '14px',
                color: '#000'
            },
            shadow: true
        }
    }],
    plotOptions: {
    ///ITEM
        series: {
            dragDrop: {
                draggableX: true,
                draggableY: true

            },
            // enableMouseTracking: false,
            states: {
                hover: {
                    enabled: true
                },
                inactive: {
                    enabled: false
                }
            }
        },
        item: {
            size: '80%',
            name: 'Item Chart',
            showInLegend: false,
            showInNavigator: false,
            animation: false,
            innerSize: '0%',
            startAngle: 100,
            endAngle: 100,
            borderColor: baseColor,
            color: null,
            opacity: null,
            borderWidth: null,
            tooltip: {
                enabled: false
            },
            dataLabels: {
                enabled: true
            }
        },
        pie: {
            center: ['64.7%', '56%'],
            size: '80%',
            innerSize: '55%'
        },
        //variablepie
        variablepie: {
            showInLegend: false,
            innerSize: '33%',
            startAngle: 0,
            animation: true,
            dataLabels: {
                enabled: true,
                connectorShape: 'straight',
                className: 'pieLabel'
            }
        },
        ///Streamgraph
        streamgraph: {
            fillOpacity: 1,
            lineColor: streamLine,
            lineWidth: 1,
            xAxis: 4,
            yAxis: 3,
            dataGrouping: {
                enabled: false
            },
            showInLegend: false,
            label: {
                enabled: true,
                minFontSize: 6,
                maxFontSize: 20,
                style: {
                    color: 'white'

                }
            },
            zoneAxis: 'x',
            zones: [{
                value: Date.UTC(1924, 7, 1),
                className: 'transparent-zone'
            }],
            tooltip: {
                enabled: false
            }
        },
        ///line
        line: {
        },
        ///Spline
        spline: {
            dataGrouping: {
                enabled: false,
                groupAll: true,
                units: [
                    ['month', [1, 3]],
                    ['year', 1]
                ]
            },
            showInLegend: false,
            dashStyle: null,
            xAxis: 0,
            yAxis: 1,
            opacity: 1,
            zIndex: 56,
            lineWidth: 1,
            lineColor: null,
            dataLabels: {
                enabled: null
            },
            label: {
                enabled: true

            },
            tooltip: {
                enabled: false
            },
            states: {
                inactive: {
                    enabled: false
                }
            }
        },
        ///Candlestick
        candlestick: {
            color: Highcharts.getOptions().colors[2],
            upColor: Highcharts.getOptions().colors[4],
            showInLegend: false,
            dataGrouping: {
                enabled: true
            },
            marker: {
                enabled: false,
                lineWidth: 0
            },
            opacity: 1,
            zIndex: 10,
            dataLabels: {
                enabled: false
            }
        },
        //Area spline
        areaspline: {
            stacking: 'normal',
            fillOpacity: 0.1,

            allowOverlap: true,
            dataGrouping: {
                enabled: false
            },
            tooltip: {
                enabled: false
            },
            showInLegend: false
        },
        ///Network
        networkgraph: {
            showInLegend: false,
            zIndex: 2,
            marker: {
                enabled: true,
                radius: null,
                symbol: 'circle',
                fillColor: 'transparent',
                lineColor: networklinkColor,
                lineWidth: 1
            },
            turboThreshold: 0
        },
        /////scatter
        scatter: {
            marker: {
                enabled: true,
                radius: 5,
                fillColor: Highcharts.getOptions().colors[4]
            },
            dashStyle: "shortdot",
            color: Highcharts.getOptions().colors[4],
            pointStart: xiData[0],
            xAxis: 5,
            yAxis: 4,
            zIndex: 50,
            label: {
                enabled: true
            },
            showInLegend: false,
            tooltip: {
                enabled: false
            }
        }
    },
    series: [
    ////0
        {
            type: 'item',
            zIndex: 8,
            label: {
                enabled: true
            },
            data: [
                {
                    y: 1,
                    markers: {
                        enabled: false
                    },
                    dataLabels: {
                        useHTML: true,
                        enabled: true,
                        formatter: function () {
                            return `
                            <div class="particles">
                                <div class="item-1">
                                <img 
                                src="https://www.goodwiththat.com/ag/p1.svg"/>
                                </div>
                                <div class="item-2">
                                <img
                                src="https://www.goodwiththat.com/ag/p2.svg"/>
                                </div>
                                <div class="item-3">
                                <img
                                src="https://www.goodwiththat.com/ag/p3.svg"/>
                                </div>
                                <div class="item-4">
                                <img
                                src="https://www.goodwiththat.com/ag/p4.svg"/>
                                </div>
                                <div class="item-5">
                                <img
                                src="https://www.goodwiththat.com/ag/p5.svg"/>
                                </div>
                                <div class="item-6">
                                <img
                                src="https://www.goodwiththat.com/ag/p6.svg"/>
                                </div>
                            <div>`;
                        }
                    }
                }
            ]
        },
        ///1
        {
            type: 'line',
            lineWidth: 0,
            showInLegend: false,
            xAxis: 1,
            yAxis: 0,
            color: null,
            dataLabels: {
                enabled: false,
                formatter: function () {
                    return this.point.index;
                }
            },
            zIndex: 30,
            label: {
                enabled: false
            },
            marker: {
                enabled: null,
                radius: null,
                lineWidth: 1,
                lineColor: 'rgba(0,0,0,.2)'
            },
            dashStyle: 'solid',
            name: 'Import air passenger fares',
            data: [[Date.UTC(2002, 4, 1), 4.80],
                [Date.UTC(2002, 5, 1), 4.30],
                [Date.UTC(2002, 6, 1), 5.60],
                [Date.UTC(2002, 7, 1), 7.60],
                [Date.UTC(2002, 8, 1), 7.00],
                [Date.UTC(2002, 9, 1), 7.60],
                [Date.UTC(2002, 10, 1), 5.60],
                [Date.UTC(2002, 11, 1), 3.00],
                [Date.UTC(2002, 12, 1), 1.40],
                [Date.UTC(2003, 1, 1), 1.90],
                [Date.UTC(2003, 2, 1), 3.80],
                [Date.UTC(2003, 3, 1), 5.30],
                [Date.UTC(2003, 4, 1), 4.80],
                [Date.UTC(2003, 5, 1), 4.40],
                [Date.UTC(2003, 6, 1), 2.70],
                [Date.UTC(2003, 7, 1), 1.30],
                [Date.UTC(2003, 8, 1), 1.30],
                [Date.UTC(2003, 9, 1), 0.60],
                [Date.UTC(2003, 10, 1), -1.40],
                [Date.UTC(2003, 11, 1), 0.40],
                [Date.UTC(2003, 12, 1), -0.20],
                [Date.UTC(2004, 1, 1), -0.90],
                [Date.UTC(2004, 2, 1), -3.20],
                [Date.UTC(2004, 3, 1), -4.60],
                [Date.UTC(2004, 4, 1), -5.70],
                [Date.UTC(2004, 5, 1), -4.70],
                [Date.UTC(2004, 6, 1), 0.70],
                [Date.UTC(2004, 7, 1), -2.20],
                [Date.UTC(2004, 8, 1), -2.70],
                [Date.UTC(2004, 9, 1), -3.90],
                [Date.UTC(2004, 10, 1), 0.80],
                [Date.UTC(2004, 11, 1), 1.80],
                [Date.UTC(2004, 12, 1), 4.40],
                [Date.UTC(2005, 1, 1), 3.70],
                [Date.UTC(2005, 2, 1), 6.00],
                [Date.UTC(2005, 3, 1), 6.20],
                [Date.UTC(2005, 4, 1), 5.10],
                [Date.UTC(2005, 5, 1), 3.60],
                [Date.UTC(2005, 6, 1), 4.10],
                [Date.UTC(2005, 7, 1), 4.30],
                [Date.UTC(2005, 8, 1), 3.80],
                [Date.UTC(2005, 9, 1), 2.50],
                [Date.UTC(2005, 10, 1), 2.70],
                [Date.UTC(2005, 11, 1), 4.40],
                [Date.UTC(2005, 12, 1), 4.10],
                [Date.UTC(2006, 1, 1), 3.60],
                [Date.UTC(2006, 2, 1), 4.20],
                [Date.UTC(2006, 3, 1), 4.50],
                [Date.UTC(2006, 4, 1), 3.80],
                [Date.UTC(2006, 5, 1), 5.60],
                [Date.UTC(2006, 6, 1), 6.70],
                [Date.UTC(2006, 7, 1), 5.60],
                [Date.UTC(2006, 8, 1), 5.60],
                [Date.UTC(2006, 9, 1), 5.60],
                [Date.UTC(2006, 10, 1), 5.90],
                [Date.UTC(2006, 11, 1), 7.70],
                [Date.UTC(2006, 12, 1), 7.80],
                [Date.UTC(2007, 1, 1), 7.00],
                [Date.UTC(2007, 2, 1), 7.10],
                [Date.UTC(2007, 3, 1), 7.00],
                [Date.UTC(2007, 4, 1), 4.80],
                [Date.UTC(2007, 5, 1), 3.90],
                [Date.UTC(2007, 6, 1), 5.80],
                [Date.UTC(2007, 7, 1), 7.20],
                [Date.UTC(2007, 8, 1), 8.20],
                [Date.UTC(2007, 9, 1), 7.10],
                [Date.UTC(2007, 10, 1), 5.50],
                [Date.UTC(2007, 11, 1), 5.60],
                [Date.UTC(2007, 12, 1), 7.90],
                [Date.UTC(2008, 1, 1), 7.80],
                [Date.UTC(2008, 2, 1), 6.70],
                [Date.UTC(2008, 3, 1), 6.80],
                [Date.UTC(2008, 4, 1), 12.60],
                [Date.UTC(2008, 5, 1), 13.70],
                [Date.UTC(2008, 6, 1), 18.70],
                [Date.UTC(2008, 7, 1), 19.50],
                [Date.UTC(2008, 8, 1), 15.80],
                [Date.UTC(2008, 9, 1), 15.00],
                [Date.UTC(2008, 10, 1), 25.30],
                [Date.UTC(2008, 11, 1), 22.90],
                [Date.UTC(2008, 12, 1), 16.30],
                [Date.UTC(2009, 1, 1), 12.20],
                [Date.UTC(2009, 2, 1), 8.10],
                [Date.UTC(2009, 3, 1), 2.70],
                [Date.UTC(2009, 4, 1), -7.10],
                [Date.UTC(2009, 5, 1), -10.10],
                [Date.UTC(2009, 6, 1), -14.20],
                [Date.UTC(2009, 7, 1), -20.10],
                [Date.UTC(2009, 8, 1), -19.50],
                [Date.UTC(2009, 9, 1), -14.50],
                [Date.UTC(2009, 10, 1), -11.60],
                [Date.UTC(2009, 11, 1), -6.40],
                [Date.UTC(2009, 12, 1), -3.20],
                [Date.UTC(2010, 1, 1), -0.70],
                [Date.UTC(2010, 2, 1), 0.40],
                [Date.UTC(2010, 3, 1), 11.00],
                [Date.UTC(2010, 4, 1), 17.30],
                [Date.UTC(2010, 5, 1), 23.30],
                [Date.UTC(2010, 6, 1), 19.00],
                [Date.UTC(2010, 7, 1), 21.30],
                [Date.UTC(2010, 8, 1), 19.00],
                [Date.UTC(2010, 9, 1), 16.70],
                [Date.UTC(2010, 10, 1), 14.90],
                [Date.UTC(2010, 11, 1), 12.80],
                [Date.UTC(2010, 12, 1), 11.60],
                [Date.UTC(2011, 1, 1), 12.20],
                [Date.UTC(2011, 2, 1), 13.60],
                [Date.UTC(2011, 3, 1), 7.60],
                [Date.UTC(2011, 4, 1), 4.50],
                [Date.UTC(2011, 5, 1), 7.30],
                [Date.UTC(2011, 6, 1), 5.00],
                [Date.UTC(2011, 7, 1), 6.20],
                [Date.UTC(2011, 8, 1), 7.40],
                [Date.UTC(2011, 9, 1), 8.50],
                [Date.UTC(2011, 10, 1), 5.50],
                [Date.UTC(2011, 11, 1), 6.20],
                [Date.UTC(2011, 12, 1), 5.70],
                [Date.UTC(2012, 1, 1), 8.80],
                [Date.UTC(2012, 2, 1), 11.80],
                [Date.UTC(2012, 3, 1), 10.90],
                [Date.UTC(2012, 4, 1), 10.30],
                [Date.UTC(2012, 5, 1), 5.10],
                [Date.UTC(2012, 6, 1), 8.60],
                [Date.UTC(2012, 7, 1), 5.20],
                [Date.UTC(2012, 8, 1), 2.50],
                [Date.UTC(2012, 9, 1), 3.00],
                [Date.UTC(2012, 10, 1), 3.10],
                [Date.UTC(2012, 11, 1), 2.90],
                [Date.UTC(2012, 12, 1), 8.20],
                [Date.UTC(2013, 1, 1), 3.90],
                [Date.UTC(2013, 2, 1), 2.30],
                [Date.UTC(2013, 3, 1), 1.70],
                [Date.UTC(2013, 4, 1), 1.20],
                [Date.UTC(2013, 5, 1), 2.60],
                [Date.UTC(2013, 6, 1), 2.90],
                [Date.UTC(2013, 7, 1), 2.10],
                [Date.UTC(2013, 8, 1), -0.50],
                [Date.UTC(2013, 9, 1), 1.10],
                [Date.UTC(2013, 10, 1), 3.40],
                [Date.UTC(2013, 11, 1), 7.90],
                [Date.UTC(2013, 12, 1), 8.20],
                [Date.UTC(2014, 1, 1), 5.10],
                [Date.UTC(2014, 2, 1), 6.70],
                [Date.UTC(2014, 3, 1), 4.80],
                [Date.UTC(2014, 4, 1), 4.80],
                [Date.UTC(2014, 5, 1), 5.00],
                [Date.UTC(2014, 6, 1), 1.40],
                [Date.UTC(2014, 7, 1), 2.60],
                [Date.UTC(2014, 8, 1), 6.70],
                [Date.UTC(2014, 9, 1), 6.30],
                [Date.UTC(2014, 10, 1), 4.40],
                [Date.UTC(2014, 11, 1), 1.90],
                [Date.UTC(2014, 12, 1), 2.70],
                [Date.UTC(2015, 1, 1), 2.30],
                [Date.UTC(2015, 2, 1), -0.60],
                [Date.UTC(2015, 3, 1), 0.50],
                [Date.UTC(2015, 4, 1), -2.70],
                [Date.UTC(2015, 5, 1), -2.90],
                [Date.UTC(2015, 6, 1), -1.10],
                [Date.UTC(2015, 7, 1), -2.40],
                [Date.UTC(2015, 8, 1), -3.20],
                [Date.UTC(2015, 9, 1), -7.20],
                [Date.UTC(2015, 10, 1), -4.70],
                [Date.UTC(2015, 11, 1), -2.20],
                [Date.UTC(2015, 12, 1), -9.90],
                [Date.UTC(2016, 1, 1), -4.30],
                [Date.UTC(2016, 2, 1), -3.30],
                [Date.UTC(2016, 3, 1), -6.30],
                [Date.UTC(2016, 4, 1), -0.20],
                [Date.UTC(2016, 5, 1), -0.50],
                [Date.UTC(2016, 6, 1), -8.40],
                [Date.UTC(2016, 7, 1), -8.30],
                [Date.UTC(2016, 8, 1), -9.10],
                [Date.UTC(2016, 9, 1), -0.80],
                [Date.UTC(2016, 10, 1), 0.20],
                [Date.UTC(2016, 11, 1), -6.00],
                [Date.UTC(2016, 12, 1), -4.20],
                [Date.UTC(2017, 1, 1), -4.90],
                [Date.UTC(2017, 2, 1), -4.20],
                [Date.UTC(2017, 3, 1), -2.70],
                [Date.UTC(2017, 4, 1), -9.10],
                [Date.UTC(2017, 5, 1), -6.90],
                [Date.UTC(2017, 6, 1), -3.80],
                [Date.UTC(2017, 7, 1), -2.60],
                [Date.UTC(2017, 8, 1), -7.40],
                [Date.UTC(2017, 9, 1), -3.70],
                [Date.UTC(2017, 10, 1), -1.40],
                [Date.UTC(2017, 11, 1), -0.90],
                [Date.UTC(2017, 12, 1), 4.20],
                [Date.UTC(2018, 1, 1), 2.60],
                [Date.UTC(2018, 2, 1), 4.20],
                [Date.UTC(2018, 3, 1), 1.50],
                [Date.UTC(2018, 4, 1), 7.90],
                [Date.UTC(2018, 5, 1), 1.20],
                [Date.UTC(2018, 6, 1), 4.80],
                [Date.UTC(2018, 7, 1), 1.50],
                [Date.UTC(2018, 8, 1), 3.50],
                [Date.UTC(2018, 9, 1), 5.70],
                [Date.UTC(2018, 10, 1), -2.20],
                [Date.UTC(2018, 11, 1), 0.70],
                [Date.UTC(2018, 12, 1), 1.80],
                [Date.UTC(2019, 1, 1), 1.20],
                [Date.UTC(2019, 2, 1), -1.70],
                [Date.UTC(2019, 3, 1), -0.90],
                [Date.UTC(2019, 4, 1), -10.60],
                [Date.UTC(2019, 5, 1), -1.90],
                [Date.UTC(2019, 6, 1), -2.50],
                [Date.UTC(2019, 7, 1), -6.60],
                [Date.UTC(2019, 8, 1), -6.10],
                [Date.UTC(2019, 9, 1), -7.40],
                [Date.UTC(2019, 10, 1), -4.90],
                [Date.UTC(2019, 11, 1), -3.00],
                [Date.UTC(2019, 12, 1), -4.70],
                [Date.UTC(2020, 1, 1), -9.50],
                [Date.UTC(2020, 2, 1), -7.40],
                [Date.UTC(2020, 3, 1), -11.30],
                [Date.UTC(2020, 4, 1), -16.20]
            ]
        },
        //2
        {
            type: 'candlestick',
            name: 'AAPL Stock Price',
            showInLegend: false,
            className: 'candlestick',
            animation: true,
            visible: true,
            id: 0,
            xAxis: 0,
            yAxis: 0,
            data: [
                [1575297000000, 267.27, 268.25, 263.45, 264.16],
                [1575383400000, 258.31, 259.53, 256.29, 259.45],
                [1575469800000, 261.07, 263.31, 260.68, 261.74],
                [1575556200000, 263.79, 265.89, 262.73, 265.58],
                [1575642600000, 267.48, 271, 267.3, 270.71],
                [1575901800000, 270, 270.8, 264.91, 266.92],
                [1575988200000, 268.6, 270.07, 265.86, 268.48],
                [1576074600000, 268.81, 271.1, 268.5, 270.77],
                [1576161000000, 267.78, 272.56, 267.32, 271.46],
                [1576247400000, 271.46, 275.3, 270.93, 275.15],
                [1576506600000, 277, 280.79, 276.98, 279.86],
                [1576593000000, 279.57, 281.77, 278.8, 280.41],
                [1576679400000, 279.8, 281.9, 279.12, 279.74],
                [1576765800000, 279.5, 281.18, 278.95, 280.02],
                [1576852200000, 282.23, 282.65, 278.56, 279.44],
                [1577111400000, 280.53, 284.25, 280.37, 284],
                [1577197800000, 284.69, 284.89, 282.92, 284.27],
                [1577370600000, 284.82, 289.98, 284.7, 289.91],
                [1577457000000, 291.12, 293.97, 288.12, 289.8],
                [1577716200000, 289.46, 292.69, 285.22, 291.52],
                [1577802600000, 289.93, 293.68, 289.52, 293.65],
                [1577975400000, 296.24, 300.6, 295.19, 300.35],
                [1578061800000, 297.15, 300.58, 296.5, 297.43],
                [1578321000000, 293.79, 299.96, 292.75, 299.8],
                [1578407400000, 299.84, 300.9, 297.48, 298.39],
                [1578493800000, 297.16, 304.44, 297.16, 303.19],
                [1578580200000, 307.24, 310.43, 306.2, 309.63],
                [1578666600000, 310.6, 312.67, 308.25, 310.33],
                [1578925800000, 311.64, 317.07, 311.15, 316.96],
                [1579012200000, 316.7, 317.57, 312.17, 312.68],
                [1579098600000, 311.85, 315.5, 309.55, 311.34],
                [1579185000000, 313.59, 315.7, 312.09, 315.24],
                [1579271400000, 316.27, 318.74, 315, 318.73],
                [1579617000000, 317.19, 319.02, 316, 316.57],
                [1579703400000, 318.58, 319.99, 317.31, 317.7],
                [1579789800000, 317.92, 319.56, 315.65, 319.23],
                [1579876200000, 320.25, 323.33, 317.52, 318.31],
                [1580135400000, 310.06, 311.77, 304.88, 308.95],
                [1580221800000, 312.6, 318.4, 312.19, 317.69],
                [1580308200000, 324.45, 327.85, 321.38, 324.34],
                [1580394600000, 320.54, 324.09, 318.75, 323.87],
                [1580481000000, 320.93, 322.68, 308.29, 309.51],
                [1580740200000, 304.3, 313.49, 302.22, 308.66],
                [1580826600000, 315.31, 319.64, 313.63, 318.85],
                [1580913000000, 323.52, 324.76, 318.95, 321.45],
                [1580999400000, 322.57, 325.22, 320.26, 325.21],
                [1581085800000, 322.37, 323.4, 318, 320.03],
                [1581345000000, 314.18, 321.55, 313.85, 321.55],
                [1581431400000, 323.6, 323.9, 318.71, 319.61],
                [1581517800000, 321.47, 327.22, 321.47, 327.2],
                [1581604200000, 324.19, 326.22, 323.35, 324.87],
                [1581690600000, 324.74, 325.98, 322.85, 324.95],
                [1582036200000, 315.36, 319.75, 314.61, 319],
                [1582122600000, 320, 324.57, 320, 323.62],
                [1582209000000, 322.63, 324.65, 318.21, 320.3],
                [1582295400000, 318.62, 320.45, 310.5, 313.05],
                [1582554600000, 297.26, 304.18, 289.23, 298.18],
                [1582641000000, 300.95, 302.53, 286.13, 288.08],
                [1582727400000, 286.53, 297.88, 286.5, 292.65],
                [1582813800000, 281.1, 286, 272.96, 273.52],
                [1582900200000, 257.26, 278.41, 256.37, 273.36],
                [1583159400000, 282.28, 301.44, 277.72, 298.81],
                [1583245800000, 303.67, 304, 285.8, 289.32],
                [1583332200000, 296.44, 303.4, 293.13, 302.74],
                [1583418600000, 295.52, 299.55, 291.41, 292.92],
                [1583505000000, 282, 290.82, 281.23, 289.03],
                [1583760600000, 263.75, 278.09, 263, 266.17],
                [1583847000000, 277.14, 286.44, 269.37, 285.34],
                [1583933400000, 277.39, 281.22, 271.86, 275.43],
                [1584019800000, 255.94, 270, 248, 248.23],
                [1584106200000, 264.89, 279.92, 252.95, 277.97],
                [1584365400000, 241.95, 259.08, 240, 242.21],
                [1584451800000, 247.51, 257.61, 238.4, 252.86]
            ],
            color: null,
            upColor: '#90ed7d',
            marker: {
                enabled: true,
                lineWidth: 1
            }
        },
        ///3
        {
            type: 'networkgraph',
            zindex: 1,
            showInLegend: false,
            link: {
                color: networklinkColor,
                dashStyle: 'dot'
            },
            visible: true,
            layoutAlgorithm: {
                enableSimulation: true,
                initialPositions: 'circle'
                // // Applied only to links, should be 0
                // attractiveForce: function () {
                //     return 0;
                // },
                // repulsiveForce: function () {
                //     return 1;
                // },
                // linkLength: 10,
                // integration: 'euler',
                // // Half of the repulsive force
                // gravitationalConstant: 1
            },

            // data:[],
            data: [
                ['0', '1'],
                ['1', '2'],
                ['1', '3'],
                ['1', '4'],
                ['1', '5'],
                ['1', '6'],
                ['1', '7'],
                ['1', '8'],
                ['1', '9'],
                ['1', '10'],
                ['1', '11'],
                ['1', '12'],
                ['1', '13'],
                ['1', '14'],
                ['1', '15'],
                ['1', '16'],
                ['1', '17'],
                ['1', '18'],
                ['1', '19'],
                ['1', '20'],
                ['1', '21'],
                ['1', '22'],
                ['1', '23'],
                ['1', '24'],
                ['1', '25'],
                ['1', '26'],
                ['1', '27'],
                ['1', '28'],
                ['1', '29'],
                ['1', '30']
                // ['1', '31'],
                // ['1', '32'],
                // ['1', '33'],
                // ['1', '34'],
                // ['1', '35'],
                // ['1', '36'],
                // ['1', '37'],
                // ['1', '38'],
                // ['1', '39'],
                // ['1', '40'],
                // ['1', '41'],
                // ['1', '42'],
                // ['1', '43'],
                // ['1', '44'],
                // ['1', '45'],
                // ['1', '46'],
                // ['1', '47'],
                // ['1', '48'],
                // ['1', '49'],
                // ['1', '50'],

            // ['1', '51'],
            // ['1', '52'],
            // ['1', '53'],
            // ['1', '54'],
            // ['1', '55'],
            // ['1', '56'],
            // ['1', '57'],
            // ['1', '58'],
            // ['1', '59'],
            // ['1', '60'],
            // ['1', '61'],
            // ['1', '62'],
            // ['1', '63'],
            // ['1', '64'],
            // ['1', '65'],
            // ['1', '66'],
            // ['1', '67'],
            // ['1', '68'],
            // ['1', '69'],
            // ['1', '70'],
            // ['1', '71'],
            // ['1', '72'],
            // ['1', '73'],
            // ['1', '74'],
            // ['1', '75'],
            // ['1', '76'],
            // ['1', '77'],
            // ['1', '78'],
            // ['1', '79'],
            // ['1', '80'],
            // ['1', '81'],
            // ['1', '82'],
            // ['1', '83'],
            // ['1', '84'],
            // ['1', '85'],
            // ['1', '86'],
            // ['1', '87'],
            // ['1', '88'],
            // ['1', '89'],
            // ['1', '90'],
            // ['1', '91'],
            // ['1', '92'],
            // ['1', '93'],
            // ['1', '94'],
            // ['1', '95'],
            // ['1', '96'],
            // ['1', '97'],
            // ['1', '98']
            ],
            nodes: [
                {
                    id: '0',
                    className: 'first-node',
                    marker: {
                        radius: 8
                    },
                    mass: 300,
                    dataLabels: {
                        enabled: false
                    },
                    color: '#7cb5ec'
                }, {
                    id: '1',
                    mass: 1,
                    marker: {
                        radius: 3
                    },
                    color: '#434348'
                }, {
                    id: '2',
                    mass: 1,
                    marker: {
                        radius: 3
                    },
                    color: '#434348'
                }, {
                    id: '3',
                    mass: 1,
                    marker: {
                        radius: 3
                    },
                    color: '#90ed7d'
                }, {
                    id: '4',
                    mass: 1,
                    marker: {
                        radius: 3
                    },
                    color: '#90ed7d'
                }, {
                    id: '5',
                    mass: 1,
                    marker: {
                        radius: 4
                    },
                    color: '#7cb5ec'
                }, {
                    id: '6',
                    mass: 1,
                    marker: {
                        radius: 4
                    },
                    color: '#7cb5ec'
                }, {
                    id: '7',
                    mass: 1,
                    marker: {
                        radius: 10
                    },
                    color: '#7cb5ec'
                }, {
                    id: '8',
                    mass: 1,
                    marker: {
                        radius: 5
                    },
                    color: '#434348'
                }, {
                    id: '9',
                    mass: 1,
                    marker: {
                        radius: 6
                    },
                    color: '#90ed7d'
                }, {
                    id: '10',
                    className: 'node-10',
                    mass: 1,
                    marker: {
                        radius: 6
                    },
                    color: '#90ed7d'
                }, {
                    id: '11',
                    mass: 1,
                    marker: {
                        radius: 7
                    },
                    color: '#7cb5ec'
                }, {
                    id: '12',
                    mass: 1,
                    marker: {
                        radius: 7
                    },
                    color: '#7cb5ec'
                }, {
                    id: '13',
                    mass: 1,
                    marker: {
                        radius: 8
                    },
                    color: '#434348'
                }, {
                    id: '14',
                    mass: 1,
                    marker: {
                        radius: 8
                    },
                    color: '#434348'
                }, {
                    id: '15',
                    mass: 1,
                    marker: {
                        radius: 9
                    },
                    color: '#90ed7d'
                }, {
                    id: '16',
                    mass: 1,
                    marker: {
                        radius: 9
                    },
                    color: '#90ed7d'
                }, {
                    id: '17',
                    mass: 1,
                    marker: {
                        radius: 10
                    },
                    color: '#7cb5ec'
                }, {
                    id: '18',
                    mass: 1,
                    marker: {
                        radius: 10
                    },
                    color: '#7cb5ec'
                }, {
                    id: '19',
                    mass: 1,
                    marker: {
                        radius: 1
                    },
                    color: '#434348'
                }, {
                    id: '20',
                    mass: 1,
                    marker: {
                        radius: 1
                    },
                    color: '#434348'
                }, {
                    id: '21',
                    mass: 1,
                    marker: {
                        radius: 2
                    },
                    color: '#90ed7d'
                }, {
                    id: '22',
                    mass: 1,
                    marker: {
                        radius: 2
                    },
                    color: '#90ed7d'
                }, {
                    id: '23',
                    mass: 1,
                    marker: {
                        radius: 3
                    },
                    color: '#7cb5ec'
                }, {
                    id: '24',
                    mass: 1,
                    marker: {
                        radius: 3
                    },
                    color: '#7cb5ec'
                }, {
                    id: '25',
                    mass: 1,
                    marker: {
                        radius: 4
                    },
                    color: '#434348'
                }, {
                    id: '26',
                    mass: 1,
                    marker: {
                        radius: 4
                    },
                    color: '#434348'
                }, {
                    id: '27',
                    mass: 1,
                    marker: {
                        radius: 5
                    },
                    color: '#90ed7d'
                }, {
                    id: '28',
                    mass: 1,
                    marker: {
                        radius: 5
                    },
                    color: '#90ed7d'
                }, {
                    id: '29',
                    mass: 1,
                    marker: {
                        radius: 6
                    },
                    color: '#7cb5ec'
                }, {
                    id: '30',
                    mass: 1,
                    marker: {
                        radius: 6
                    },
                    color: '#7cb5ec'
                }
            ]
        },
        //4
        {
            type: 'variablepie',
            data: []
        },
        ///5 - 17
        {
            type: 'streamgraph',
            name: streamSeries[0].name,
            data: streamDataArrays[0],
            color: '#43abff',
            className: 'stream-1'
        },
        {
            type: 'streamgraph',
            name: streamSeries[1].name,
            data: streamDataArrays[2],
            color: '#84c3ff',
            className: 'stream-2'
        },
        {
            type: 'streamgraph',
            name: streamSeries[2].name,
            data: streamDataArrays[2],
            color: '#d0e3fc',
            className: 'stream-3'
        },
        {
            type: 'streamgraph',
            name: streamSeries[3].name,
            data: streamDataArrays[3],
            color: '#7c95ff',
            className: 'stream-4'
        },
        {
            type: 'streamgraph',
            name: streamSeries[4].name,
            data: streamDataArrays[4],
            color: '#ff4768',
            className: 'stream-5'
        },
        {
            type: 'streamgraph',
            name: streamSeries[5].name,
            data: streamDataArrays[5],
            color: '#88eff9',
            className: 'stream-6'
        },
        {
            type: 'streamgraph',
            name: streamSeries[6].name,
            data: streamDataArrays[6],
            color: '#737cff',
            className: 'stream-7'
        },
        {
            type: 'streamgraph',
            name: streamSeries[7].name,
            data: streamDataArrays[7],
            color: '#afb9ff',
            className: 'stream-8'
        },
        {
            type: 'streamgraph',
            name: streamSeries[8].name,
            data: streamDataArrays[8],
            color: '#e5e0ff',
            className: 'stream-9'
        },
        {
            type: 'streamgraph',
            name: streamSeries[10].name,
            data: streamDataArrays[10],
            color: Highcharts.color(colors[5]).brighten(0.2).get(),
            className: 'stream-10'
        },
        {
            type: 'streamgraph',
            name: streamSeries[11].name,
            data: streamDataArrays[11],
            color: Highcharts.color(colors[4]).brighten(0.1).get(),
            className: 'stream-11'
        },
        {
            type: 'streamgraph',
            name: streamSeries[12].name,
            data: streamDataArrays[12],
            color: Highcharts.color(colors[5]).brighten(0.1).get(),
            className: 'stream-12'
        },
        {
            type: 'streamgraph',
            name: streamSeries[13].name,
            data: streamDataArrays[13],
            color: Highcharts.color(colors[0]).brighten(0.1).get(),
            className: 'stream-13'
        },
        //18 - 26
        kernelSeries[0],
        kernelSeries[1],
        kernelSeries[2],
        kernelSeries[3],
        kernelSeries[4],
        kernelSeries[5],
        kernelSeries[6],
        kernelSeries[7],
        kernelSeries[8],
        {
            type: 'areaspline',
            className: 'water',
            visible: false,
            marker: {
                enabled: false,
                radius: 10,
                symbol: 'circle'
            },
            data: [
                {
                    x: 60,
                    y: 11.15
                },
                {
                    x: 62,
                    y: 11
                },
                {
                    x: 65,
                    y: 10.45
                },
                {
                    x: 68,
                    y: 10.2
                },
                {
                    x: 70,
                    y: 9.8
                }

            ],
            xAxis: 6,
            yAxis: 2,
            zIndex: 20
        }
        //{
        //     type: 'area',
        //     className: 'stream-particle-cover',
        //     data: [
        //         {
        //             x: 60,
        //             y: 0,
        //             marker: {
        //                 enabled: false
        //             },
        //             dataLabels: {
        //                 enabled: false,
        //                 useHTML: true,
        //                 formatter: function () {
        //                     return `
        //                      <div style="z-index:100;
        //                      background-color:#30488a;
        //                     border:1px solid #fff;
        //                     position:absolute;
        //                     top:-200px;
        //                     width:80%;
        //                     height:300px;
        //                     display:block">
        //                     <svg width="300" height="300" viewBox="0 0 300 300">
        //                         <path fill="black"
        //                         stroke="black"
        //                         stroke-width="1"
        //                         d="M 0 200 L 0,75 A 5,5 0,0,1 150,75 L 200 200 z"></path>
        //                     </svg>
        //                     </div>
        //                     `;
        //                 }
        //             }
        //         },
        //         {
        //             x: 61,
        //             y: 0
        //         },
        //         {
        //             x: 62,
        //             y: 0
        //         },
        //         {
        //             x: 63,
        //             y: 0
        //         },
        //         {
        //             x: 64,
        //             y: 0
        //         },
        //         {
        //             x: 65,
        //             y: 0
        //         },
        //         {
        //             x: 66,
        //             y: 0
        //         },
        //         {
        //             x: 67,
        //             y: 0
        //         },
        //         {
        //             x: 68,
        //             y: 0
        //         },
        //         {
        //             x: 69,
        //             y: 0

        //         },
        //         {
        //             x: 70,
        //             y: 0
        //         },

        //         {
        //             x: 71,
        //             y: 0
        //         },
        //         {
        //             x: 72,
        //             y: 0
        //         },
        //         {
        //             x: 73,
        //             y: 0
        //         }

        //     ],
        //     xAxis: 6,
        //     yAxis: 2,
        //     zIndex: 120
        // }
    ]
};

demoChart = Highcharts.stockChart('container', heroChart);
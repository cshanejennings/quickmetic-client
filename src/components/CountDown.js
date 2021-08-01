import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  PieChart,
  Pie,
  Cell
} from 'recharts';

import {
} from '@material-ui/core/';

import tinycolor from 'tinycolor2';

const get_styles = makeStyles(theme => ({
  root: {}
}));



const CountDown = (props) => {
  const classes = get_styles();
  const { elapsed, remaining, percent, width } = props;
  const fg = tinycolor.mix("#A1C7FE", "#B73060", percent * 100).toHex()
  const bg = tinycolor.mix("#dcf3f7", "#000000", percent * 100).toHex()
  const colors = [
    "#" + fg,
    "#" + bg,
  ];

  const get_cell = (entry, index) => {
    return <Cell key={`cell-${index}`} fill={colors[index]}/>
  }

  const time = [{ value: remaining }, { value: elapsed }];

  const minutes = Math.floor(remaining / 60)
  const seconds = String((remaining % 60)).padStart(2, '0');
  //
  // console.log(c);
  // debugger;
  // const c = colord().mix(, 0.6).toHex();
  // console.log(c);
  // debugger;
  // const c =Color('rgb(255, 255, 255)');
  // debugger;
  // console.log(percent, color);



  return (
      <div className={ classes.root }>
      <PieChart width={ width } height={ width }>

        <radialGradient id="SVGID_1_" cx="-2116.6248" cy="119.9903" r="119.9989" gradientTransform="matrix(-1 0 0 1 -1996.6241 0.0084)" gradientUnits="userSpaceOnUse">
        	<stop  offset="0.9525" style={ { stopColor: "#EBEBEB" } }/>
        	<stop  offset="0.9817" style={ { stopColor: "#FFFFFF" } }/>
        	<stop  offset="0.9882" style={ { stopColor: "#FBFBFB" } }/>
        	<stop  offset="0.995" style={ { stopColor: "#EEEEEE" } }/>
        	<stop  offset="1" style={ { stopColor: "#E0E0E0" } }/>
        </radialGradient>
        <circle fill="url(#SVGID_1_)" cx="120" cy="120" r="120"/>
        <radialGradient id="SVGID_2_" cx="-2117.1724" cy="118.6238" r="121.5355" gradientTransform="matrix(-1 0 0 1 -1996.6241 0.0084)" gradientUnits="userSpaceOnUse">
        	<stop  offset="0.9175" style={  {stopColor:"#FFFFFF" } }/>
        	<stop  offset="0.9536" style={  {stopColor:"#FDFDFD" } }/>
        	<stop  offset="0.9666" style={  {stopColor:"#F6F6F6" } }/>
        	<stop  offset="0.9758" style={  {stopColor:"#EBEBEB" } }/>
        	<stop  offset="0.9833" style={  {stopColor:"#DADADA" } }/>
        	<stop  offset="0.9897" style={  {stopColor:"#C4C4C4" } }/>
        	<stop  offset="0.9953" style={  {stopColor:"#A9A9A9" } }/>
        	<stop  offset="1" style={  {stopColor:"#8C8C8C" } }/>
        </radialGradient>
        <path fill="url(#SVGID_2_)" d="M6.826,80.032c-2.851,10.251-4.382,21.053-4.382,32.213c0,66.243,53.702,119.946,119.946,119.946
        	c52.746,0,97.538-34.047,113.604-81.361C222.385,202.163,175.614,240,119.999,240C53.725,240,0,186.275,0,120.001
        	C0,105.986,2.41,92.535,6.826,80.032z"/>
        <defs>
        	<filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="3.925" y="3.924" width="232.152" height="232.153">
        		<feColorMatrix  type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
        	</filter>
        </defs>
        <mask maskUnits="userSpaceOnUse" x="3.925" y="3.924" width="232.152" height="232.153" id="SVGID_3_">
        	<g filter="url(#Adobe_OpacityMaskFilter)">

        			<radialGradient id="SVGID_4_" cx="-2116.6248" cy="119.9906" r="116.0755" gradientTransform="matrix(-1 0 0 1 -1996.6241 0.0084)" gradientUnits="userSpaceOnUse">
        			<stop  offset="0.9631" style={{ stopColor:"#FFFFFF"}}/>
        			<stop  offset="0.9682" style={{ stopColor:"#FBFBFB"}}/>
        			<stop  offset="0.9728" style={{ stopColor:"#F0F0F0"}}/>
        			<stop  offset="0.9774" style={{ stopColor:"#DDDDDD"}}/>
        			<stop  offset="0.9819" style={{ stopColor:"#C3C3C3"}}/>
        			<stop  offset="0.9863" style={{ stopColor:"#A1A1A1"}}/>
        			<stop  offset="0.9906" style={{ stopColor:"#777777"}}/>
        			<stop  offset="0.9949" style={{ stopColor:"#454545"}}/>
        			<stop  offset="0.9991" style={{ stopColor:"#0D0D0D"}}/>
        			<stop  offset="1" style={{ stopColor:"#000000"}}/>
        		</radialGradient>
        		<circle fill="url(#SVGID_4_)" cx="120" cy="120" r="116.076"/>
        	</g>
        </mask>
        <radialGradient id="SVGID_5_" cx="-2200.5234" cy="43.4615" r="225.8689" gradientTransform="matrix(-1 0 0 1 -1996.6241 0.0084)" gradientUnits="userSpaceOnUse">
        	<stop  offset="0" style={{ stopColor:"#E3E3E3"}}/>
        	<stop  offset="1" style={{ stopColor:"#E3E3E3"}}/>
        </radialGradient>
        <circle mask="url(#SVGID_3_)" fill="url(#SVGID_5_)" cx="120" cy="120" r="116.076"/>
        <radialGradient id="SVGID_6_" cx="-2114.0549" cy="121.533" r="82.1351" gradientTransform="matrix(-1 0 0 1 -1996.6241 0.0084)" gradientUnits="userSpaceOnUse">
        	<stop  offset="0" style={{ stopColor:"#F5F5F5"}}/>
        	<stop  offset="0.5153" style={{ stopColor:"#F0F0F0"}}/>
        	<stop  offset="0.775" style={{ stopColor:"#EBEBEB"}}/>
        	<stop  offset="0.868" style={{ stopColor:"#E9E9E9"}}/>
        	<stop  offset="0.9092" style={{ stopColor:"#E2E2E2"}}/>
        	<stop  offset="0.9401" style={{ stopColor:"#D5D5D5"}}/>
        	<stop  offset="0.965" style={{ stopColor:"#C4C4C4"}}/>
        	<stop  offset="0.9867" style={{ stopColor:"#D1D1D1"}}/>
        	<stop  offset="1" style={{ stopColor:"#DBDBDB"}}/>
        </radialGradient>
        <path fill="url(#SVGID_6_)" d="M43.04,120.001c0,42.503,34.457,76.961,76.961,76.961c42.505,0,76.961-34.458,76.961-76.961
        	c0-42.504-34.456-76.96-76.961-76.96C77.496,43.04,43.04,77.496,43.04,120.001z"/>
        <radialGradient id="SVGID_7_" cx="-2114.0549" cy="121.533" r="82.1351" gradientTransform="matrix(-1 0 0 1 -1996.6241 0.0084)" gradientUnits="userSpaceOnUse">
        	<stop  offset="0" style={{ stopColor:"#F5F5F5"}}/>
        	<stop  offset="0.5153" style={{ stopColor:"#F0F0F0"}}/>
        	<stop  offset="0.775" style={{ stopColor:"#EBEBEB"}}/>
        	<stop  offset="0.868" style={{ stopColor:"#E9E9E9"}}/>
        	<stop  offset="0.9092" style={{ stopColor:"#E2E2E2"}}/>
        	<stop  offset="0.9401" style={{ stopColor:"#D5D5D5"}}/>
        	<stop  offset="0.965" style={{ stopColor:"#C4C4C4"}}/>
        	<stop  offset="0.9867" style={{ stopColor:"#D1D1D1"}}/>
        	<stop  offset="1" style={{ stopColor:"#DBDBDB"}}/>
        </radialGradient>
        <path fill="url(#SVGID_7_)" d="M43.04,120.001c0,42.503,34.457,76.961,76.961,76.961c42.505,0,76.961-34.458,76.961-76.961
        	c0-42.504-34.456-76.96-76.961-76.96C77.496,43.04,43.04,77.496,43.04,120.001z"/>
        <radialGradient id="SVGID_8_" cx="-2115.8787" cy="122.8762" r="79.5204" gradientTransform="matrix(-1 0 0 1 -1996.6241 0.0084)" gradientUnits="userSpaceOnUse">
        	<stop  offset="0" style={{ stopColor:"#F5F5F5"}}/>
        	<stop  offset="0.5767" style={{ stopColor:"#F0F0F0"}}/>
        	<stop  offset="0.8673" style={{ stopColor:"#EBEBEB"}}/>
        	<stop  offset="0.9151" style={{ stopColor:"#E9E9E9"}}/>
        	<stop  offset="0.9363" style={{ stopColor:"#E2E2E2"}}/>
        	<stop  offset="0.9522" style={{ stopColor:"#D5D5D5"}}/>
        	<stop  offset="0.965" style={{ stopColor:"#C4C4C4"}}/>
        	<stop  offset="0.9867" style={{ stopColor:"#D1D1D1"}}/>
        	<stop  offset="1" style={{ stopColor:"#DBDBDB"}}/>
        </radialGradient>
        <path fill="url(#SVGID_8_)" d="M43.04,120.001c0,42.503,34.457,76.961,76.961,76.961c42.505,0,76.961-34.458,76.961-76.961
        	c0-42.504-34.456-76.96-76.961-76.96C77.496,43.04,43.04,77.496,43.04,120.001z"/>
        <radialGradient id="SVGID_9_" cx="-2118.1318" cy="117.0319" r="79.9764" gradientTransform="matrix(-1 0 0 1 -1996.6241 0.0084)" gradientUnits="userSpaceOnUse">
        	<stop  offset="0.595" style={{ stopColor:"#D1D1D1"}}/>
        	<stop  offset="0.7073" style={{ stopColor:"#D6D6D6"}}/>
        	<stop  offset="0.8434" style={{ stopColor:"#E5E5E5"}}/>
        	<stop  offset="0.9914" style={{ stopColor:"#FDFDFD"}}/>
        	<stop  offset="1" style={{ stopColor:"#FFFFFF"}}/>
        </radialGradient>
        <path fill="url(#SVGID_9_)" d="M66.674,64.514C53.375,78.346,45.199,97.14,45.199,117.841c0,42.504,34.455,76.963,76.961,76.963
        	c20.702,0,39.494-8.178,53.327-21.477c-14.003,14.568-33.685,23.635-55.487,23.635c-42.504,0-76.961-34.458-76.961-76.961
        	C43.04,98.2,52.106,78.517,66.674,64.514z"/>
          <Pie
            data={ time }
            startAngle={ 90 }
            endAngle={ 450 }
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={82}
            outerRadius={110}
            isAnimationActive={false}
            fill={ tinycolor.mix("#A1C7FE", "#B73060", percent * 100).toHex() }
          >{ time.map(get_cell)}</Pie>
          <text textAnchor="middle" dominantBaseline="middle"
            fontSize="2rem"
            fill={ "#" + tinycolor.mix("#A1C7FE", "#B73060", percent * 100).toHex() }
            x={ width / 2 }
            y={ width / 2 }
          >{`${minutes}:${seconds}`}</text>
      </PieChart>
      </div>
  );
}

CountDown.propTypes = {
  width: PropTypes.number.isRequired,
  elapsed: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
}

export default CountDown;

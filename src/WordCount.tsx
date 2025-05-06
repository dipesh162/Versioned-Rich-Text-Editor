import React from 'react';

function WordCount({ wordCount }:{wordCount: number}) {
  return (
    <div style={styles.wordCount}>Word Count: {wordCount}</div>
  );
}
const styles = {
    wordCount: {
      fontSize: '20px',
      color: 'rgb(79 87 103)',
      fontFamily: 'cursive',
      fontWeight: 'bold',
      letterSpacing: '0px'
    }
  };
  

export default WordCount;


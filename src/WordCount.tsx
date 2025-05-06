import React from 'react';

function WordCount({ wordCount }:{wordCount: number}) {
  return (
    <div style={styles.wordCount}>Word Count: {wordCount}</div>
  );
}
const styles = {
    wordCount: {
      fontSize: '16px',
      color: '#6b7280',
      fontFamily: 'cursive',
      fontWeight: 'bold'
    }
  };
  

export default WordCount;


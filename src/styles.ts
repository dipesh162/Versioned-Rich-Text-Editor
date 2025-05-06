import { CSSProperties } from 'react';

interface Styles {
  card: CSSProperties;
  cardHeader: CSSProperties;
  cardTitle: CSSProperties;
  headerControls: CSSProperties;
  cardContent: CSSProperties;
  timelineControls: CSSProperties;
  buttonGroup: CSSProperties;
  button: CSSProperties;
  btnDisabled: CSSProperties;
  createBranchBtn: CSSProperties;
  createBtnDisabled: CSSProperties;
  sliderContainer: CSSProperties;
  slider: CSSProperties;
  versionLabel: CSSProperties;
  versionIndicatorContainer: CSSProperties;
  versionIndicator: CSSProperties;
  wordCount: CSSProperties;
  editModeToggle: CSSProperties;
  editModeLabel: CSSProperties;
  input: CSSProperties;
}

const styles: Styles = {
  card: {
    width: '100%',
    margin: '0 auto',
    backgroundColor: '#ffffff',
  },
  cardHeader: {
    padding: '16px',
    maxWidth: '1200px',
    margin: 'auto',
    borderBottom: '1px solid #e0e0e0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    minHeight: '460px',
    maxHeight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#000000b5',
    fontSize: '28px',
    letterSpacing: '1px'
  },
  cardTitle: {
    fontSize: '24px',
    marginBottom: '8px',
  },
  headerControls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    padding: '16px',
    width: '800px',
    minWidth: '800px',
    maxWidth: '100%',
    display: 'inline-block',
    padding: '10px',
  },
  timelineControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '16px 0px 18px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #d1d5db',
    height: '50px',
    width: '50px',
    fontSize: '24px',
    backgroundColor: '#f9fafb',
    cursor: 'pointer',
    borderRadius: '50%',
    color: 'black',
    border: '2px solid rgba(0,0,0,0.1)',
  },
  btnDisabled: {
    border: '1px solid #999999',
    backgroundColor: '#cccccc',
    color: '#666666',
    cursor: 'not-allowed',
  },
  createBranchBtn: {
    background: '#005bb5',
    border: 'none',
    padding: '14px 20px',
    fontSize: '17px',
    fontWeight: '600',
    letterSpacing: '1px',
    fontFamily: 'system-ui',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  createBtnDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
  sliderContainer: {
    flex: 1,
    margin: '0 16px',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    gap: '12px',
  },
  slider: {
    width: '100%',
  },
  versionLabel: {
    fontSize: '14px',
    color: '#6b7280',
  },
  versionIndicatorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    fontFamily: 'cursive',
    letterSpacing: '-1px',
  },
  versionIndicator: {
    borderRadius: '50%',
    height: '12px',
    width: '12px',
    background: '#4392e0',
  },
  wordCount: {
    fontSize: '14px',
    color: '#6b7280',
  },
  editModeToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  editModeLabel: {
    fontSize: '14px',
    color: '#6b7280',
  },
  input: {
    width: '100%',
    cursor: 'pointer',
    position: 'absolute',
  },
};

export default styles;

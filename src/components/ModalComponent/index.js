import React from 'react';

import {
  Modal,
  Backdrop,
  makeStyles,
  Grid,
  Container,
} from '@material-ui/core';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: '25px',
  },
});

export default function ModalComponent({
  children,
  openState,
  closeAction,
  height = '90%',
  width = '90%',
  modalStyle,
  containerStyle,
  grid,
}) {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openState}
      onClose={closeAction}
      style={modalStyle}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      {grid ? (
        <Grid
          container
          className={classes.container}
          style={{
            height,
            width,
            ...containerStyle,
          }}
        >
          {children}
        </Grid>
      ) : (
        <Container
          className={classes.container}
          style={{
            height,
            width,
            ...containerStyle,
          }}
        >
          <section className="w-full flex flex-row items-end justify-end">
            <button onClick={closeAction} type="button" className="font-semibold">
              Fechar X
            </button>
          </section>
          {children}
        </Container>
      )}
    </Modal>
  );
}

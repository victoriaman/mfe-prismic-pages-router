function CustomError({ statusCode }: { statusCode?: number }) {
    return (
      <p>
        {statusCode
          ? `An error ${statusCode} occurred`
          : 'An error occurred on client'}
      </p>
    );
  }
  
  CustomError.getInitialProps = ({ res, err }: any) => {
    const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
    return { statusCode };
  };
  
  export default CustomError;
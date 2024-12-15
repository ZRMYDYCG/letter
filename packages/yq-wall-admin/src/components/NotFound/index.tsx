import { Button, Result } from 'antd';

export default () => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => (window.location.href = '/dashboard')}
          >
            回到主控台
          </Button>
        }
      />
    </>
  );
};

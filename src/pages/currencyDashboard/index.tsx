import Container from '@mui/material/Container';
import Converter from './converter';

export default function CurrencyDashboard() {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Converter />
    </Container>
  );
}

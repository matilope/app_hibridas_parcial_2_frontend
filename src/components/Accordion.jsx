import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BasicAccordion = ({ name, info }) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={name}
      id={name}
    >
      <Typography>{name}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        {info}
      </Typography>
    </AccordionDetails>
  </Accordion>
)

export {
  BasicAccordion
};
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";
export default function FormationTimeLine({ formation }) {
  const sortByStartDate = (data) => {
    return data.sort((a, b) => {
      const startDateA = a.dates_de_debut_et_de_fin.split("-");
      const startDateB = b.dates_de_debut_et_de_fin.split("-");

      const dateA = new Date(startDateA[1], startDateA[0] - 1); // Mois commence à 0 en JavaScript
      const dateB = new Date(startDateB[1], startDateB[0] - 1); // Mois commence à 0 en JavaScript

      return dateB - dateA; // Tri croissant
    });
  };
  const sortedData = sortByStartDate(formation || []);
  return (
    <Timeline>
      {sortedData.map((item, index) => {
        const [startMonth, startYear] = item.dates_de_debut_et_de_fin
          .split("-")
          .slice(0, 2);
        const [endMonth, endYear] = item.dates_de_debut_et_de_fin
          .split("-")
          .slice(2, 4);

        return (
          <TimelineItem key={index}>
            <TimelineConnector />
            <TimelineHeader className="h-3">
              <TimelineIcon />
              <Typography
                variant="h6"
                color="blue-gray"
                className="leading-none"
              >
                {item.diplome}
              </Typography>
            </TimelineHeader>
            <TimelineBody className="pb-8">
              <Typography
                variant="small"
                color="gray"
                className="font-normal text-gray-600 mb-2"
              >
                {item.etablissement} - {startMonth}/{startYear} à{" "}
                {endMonth && endYear ? `${endMonth}/${endYear}` : "Present"}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="font-normal text-gray-600"
              >
                {item.specialite}
              </Typography>
            </TimelineBody>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

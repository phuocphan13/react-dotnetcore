import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const [activities, SetActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSeclectedAcxtivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
   const [loading,setLoading] = useState(true);
   const [submitting, setSubmitting] = useState(false);
   const [target, setTarget] = useState('');

  const HandleSelectActivity = (id: string) => {
    setSeclectedAcxtivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSeclectedAcxtivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      SetActivities([...activities, activity]);
      setSeclectedAcxtivity(activity);
      setEditMode(false);
    }).then(() =>setSubmitting(false));
  };

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      SetActivities([
        ...activities.filter(a => a.id !== activity.id),
        activity
      ]);
      setSeclectedAcxtivity(activity);
      setEditMode(false);
    }).then(()=>setSubmitting(false));
  };

  const handleDeleteActivity = (event:SyntheticEvent<HTMLButtonElement>,id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(()=>{
      SetActivities([...activities.filter(a => a.id !== id)]);
    }).then(()=>setSubmitting(false));
  };
  useEffect(() => {
    agent.Activities.List().then(response => {
      let activities: IActivity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split(".")[0];
        activities.push(activity);
      });
      SetActivities(response);
    }).then(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingComponent content='Loading activities ...'/>
  }
  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivitiesDashboard
          activities={activities}
          selectActivity={HandleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSeclectedAcxtivity={setSeclectedAcxtivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting ={submitting}
          target ={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;

import ActorForm from "./ActorForm";

export default function EditActor() {
    return (
        <>
            <h3>Edit Actor</h3>
            <ActorForm model={
                {
                    name: 'Tom Holland',
                    dateOfBirth: new Date('1996-06-01T00:00:00'),
                    biography: `# Title
Benventuo in svervegia **capron**.
`,
                    pictureURL: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Arnold_Schwarzenegger_by_Gage_Skidmore_3.jpg'
                }}
                onSubmit={values => console.log(values)}
            />
        </>
    )
}
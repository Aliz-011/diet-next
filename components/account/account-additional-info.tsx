export const AccountAdditionalInfo = () => {
  return (
    <section className="my-10 border p-6 rounded-lg space-y-8">
      <div>
        <h2 className="text-base font-semibold leading-7 dark:text-gray-200">
          How do we calculate the information above?
        </h2>
        <p className="mt-1 text-sm leading-6 dark:text-gray-400">
          From Ideal weight, BMI and calories need per day
        </p>
      </div>

      <div>
        <div className="text-base font-semibold leading-7 dark:text-gray-200">
          Ideal weight
        </div>
        <p className="mt-1 text-sm leading-6 dark:text-gray-400">
          For woman (kg) = (Height (cm) – 100)-(Height (cm)-100) x 10%
        </p>
        <p className="mt-1 text-sm leading-6 dark:text-gray-400">
          For man (kg) = (Height (cm) – 100)-(Height(cm)-100) x 15%
        </p>
      </div>
      <div>
        <div className="text-base font-semibold leading-7 dark:text-gray-200">
          Body Mass Index or BMI
        </div>
        <p className="mt-1 text-sm leading-6 dark:text-gray-400">
          BMI = Weight (kg) / Height^2 (m)
        </p>
        <div className="mt-1 text-sm font-semibold leading-6 dark:text-gray-400">
          After we got the BMI, it'll compare that from the categories below
        </div>
        <div className="flex flex-col">
          <span className="mt-1 text-sm leading-6 dark:text-gray-400">
            Light: 15-19.9
          </span>
          <span className="mt-1 text-sm leading-6 dark:text-gray-400">
            Normal: 20-24.9
          </span>
          <span className="mt-1 text-sm leading-6 dark:text-gray-400">
            Overweight: 25-29.9
          </span>
          <span className="mt-1 text-sm leading-6 dark:text-gray-400">
            Obese: {'>'}= 30
          </span>
        </div>
      </div>

      <div>
        <div className="text-base font-semibold leading-7 dark:text-gray-200">
          Calorie needs or Bassal Metabolic Rate
        </div>
        <p className="mt-1 text-sm leading-6 dark:text-gray-400">
          For woman (kg) = 655,1 + (9,563 x Weight in kg) + (1,850 x Height in
          cm) - (4,676 x age in years)
        </p>
        <p className="mt-1 text-sm leading-6 dark:text-gray-400">
          For man (kg) = 66,5 + (13,75 x Weight in kg) + (5,003 x Height in cm)
          - (6,75 x age in years)
        </p>
        <div className="mt-2 text-sm font-semibold leading-6 dark:text-gray-400">
          The results of the BMR calculation are then multiplied by physical{' '}
          <br />
          activity to obtain daily calorie requirements based on the following
          criteria
        </div>
        <div className="grid grid-cols-2 gap-x-4 mt-1">
          <div className="flex flex-col">
            <h3 className="font-medium text-sm">For men</h3>
            <span className="mt-1 text-sm leading-6 dark:text-gray-400">
              Very Light: 1.0
            </span>
            <span className="mt-1 text-sm leading-6 dark:text-gray-400">
              Light: 1.12
            </span>
            <span className="mt-1 text-sm leading-6 dark:text-gray-400">
              Active: 1.27
            </span>
            <span className="mt-1 text-sm leading-6 dark:text-gray-400">
              Very Active: 1.54
            </span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium text-sm">For women</h3>
            <span className="mt-1 text-sm leading-6 dark:text-gray-400">
              Very Light: 1.0
            </span>
            <span className="mt-1 text-sm leading-6 dark:text-gray-400">
              Light: 1.14
            </span>
            <span className="mt-1 text-sm leading-6 dark:text-gray-400">
              Active: 1.27
            </span>
            <span className="mt-1 text-sm leading-6 dark:text-gray-400">
              Very Active: 1.45
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div
          className="p-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <span className="font-medium">
            The American Heart Association and other health organizations
          </span>{' '}
          typically recommended duration at least 150 minutes of
          moderate-intensity aerobic activity or 75 minutes of
          vigorous-intensity aerobic activity per week for adults, along with
          muscle-strengthening 30 minutes to an hour activities typically
          recommend on two or more days per week.
        </div>
        <div
          className="p-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          The number of sets and repetitions (reps) you should perform can vary
          depending on factors such as your fitness level, the specific
          exercises you're doing, and your goals. However, a common
          recommendation for beginners is to start with 1 to 3 sets of 8 to 12
          repetitions for each exercise.
        </div>
      </div>
    </section>
  );
};

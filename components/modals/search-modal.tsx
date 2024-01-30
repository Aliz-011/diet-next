'use client';

import { useMemo, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { Dumbbell, Pizza } from 'lucide-react';

import Modal from './modal';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { useSearchModal } from '@/hooks/use-search-modal';

enum STEPS {
  CATEGORY,
  INFO,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [dietKind, setDietKind] = useState<string | undefined>(undefined);
  const [exerciseName, setExerciseName] = useState('');
  const [minFat, setMinFat] = useState<string>('');
  const [minCarbs, setMinCarbs] = useState<string>('');
  const [minProtein, setMinProtein] = useState<string>('');
  const [minCalories, setMinCalories] = useState<string>('');
  const [minSugar, setMinSugar] = useState<string>('');
  const [step, setStep] = useState(STEPS.CATEGORY);

  const { onClose, isOpen } = useSearchModal((state) => state);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const handleSearch = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    if (dietKind === 'food') {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        dietKind,
        minFat: minFat ? minFat : '10',
        minCarbs: minCarbs ? minCarbs : '10',
        minProtein: minProtein ? minProtein : '10',
        minCalories: minCalories ? minCalories : '10',
        minSugar: minSugar ? minSugar : '10',
      };

      const url = qs.stringifyUrl({
        url: '/search',
        query: updatedQuery,
      });

      router.push(url);
    } else {
      const url = qs.stringifyUrl({
        url: '/search',
        query: {
          name: exerciseName,
        },
      });

      router.push(url);
      setExerciseName('');
    }

    setStep(STEPS.CATEGORY);
    onClose();
  }, [step, onClose, router, onNext]);

  const handleSecondaryAction = () => {
    const secondaryAction = step === STEPS.CATEGORY ? undefined : onBack;
    if (!secondaryAction) {
      return;
    }

    onBack();
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  if (step === STEPS.CATEGORY) {
  }

  let bodyContent = (
    <>
      <RadioGroup
        defaultValue="card"
        onValueChange={(e) => setDietKind(e)}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <RadioGroupItem value="food" id="food" className="peer sr-only" />
          <Label
            htmlFor="food"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Pizza className="mb-3 h-6 w-6" />
            Food
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value="exercise"
            id="exercise"
            className="peer sr-only"
          />
          <Label
            htmlFor="exercise"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Dumbbell className="mb-3 h-6 w-6" />
            Exercise
          </Label>
        </div>
      </RadioGroup>
    </>
  );

  if (step === STEPS.INFO) {
    if (dietKind === 'food') {
      bodyContent = (
        <div className="space-y-6">
          <div className="flex items-center justify-between w-full">
            <Label htmlFor="minCarb" className="w-1/3">
              Min. carbs
            </Label>
            <div className="space-y-2 w-2/3">
              <Input
                value={minCarbs}
                onChange={(e) => setMinCarbs(e.target.value)}
                placeholder="e.g. 50"
              />
              <p className="text-xs text-muted-foreground">
                If empty the value going to be 10
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <Label htmlFor="minFat" className="w-1/3">
              Min. fat
            </Label>
            <div className="space-y-2 w-2/3">
              <Input
                value={minFat}
                onChange={(e) => setMinFat(e.target.value)}
                placeholder="e.g. 50"
              />
              <p className="text-xs text-muted-foreground">
                If empty the value going to be 10
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <Label htmlFor="minCalories" className="w-1/3">
              Min. calories
            </Label>
            <div className="space-y-2 w-2/3">
              <Input
                value={minCalories}
                onChange={(e) => setMinCalories(e.target.value)}
                placeholder="e.g. 50"
              />
              <p className="text-xs text-muted-foreground">
                If empty the value going to be 10
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <Label htmlFor="minProtein" className="w-1/3">
              Min. protein
            </Label>
            <div className="space-y-2 w-2/3">
              <Input
                value={minProtein}
                onChange={(e) => setMinProtein(e.target.value)}
                placeholder="e.g. 50"
              />
              <p className="text-xs text-muted-foreground">
                If empty the value going to be 10
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <Label htmlFor="minSugar" className="w-1/3">
              Min. sugar
            </Label>
            <div className="space-y-2 w-2/3">
              <Input
                value={minSugar}
                onChange={(e) => setMinSugar(e.target.value)}
                placeholder="e.g. 50"
              />
              <p className="text-xs text-muted-foreground">
                If empty the value going to be 10
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      bodyContent = (
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="minProtein">Name</Label>

          <Input
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            placeholder="e.g. Archer push up"
          />
          <p className="text-xs text-muted-foreground">Name of the exercise</p>
        </div>
      );
    }
  }

  return (
    <Modal
      title="Search"
      description="Looking for something?"
      isOpen={isOpen}
      onChange={onClose}
    >
      <div className="flex flex-col gap-4">
        {bodyContent}
        <div className="w-full flex items-center justify-between">
          {handleSecondaryAction && secondaryLabel && (
            <Button variant="secondary" onClick={handleSecondaryAction}>
              {secondaryLabel}
            </Button>
          )}
          <Button onClick={handleSearch} disabled={dietKind === undefined}>
            {actionLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;

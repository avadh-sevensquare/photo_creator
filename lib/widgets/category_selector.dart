import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../theme/app_theme.dart';

class CategoryOption {
  final String id;
  final String label;
  final String iconAsset;
  const CategoryOption(this.id, this.label, this.iconAsset);
}

class CategorySelector extends StatelessWidget {
  final List<CategoryOption> options;
  final String selectedId;
  final ValueChanged<String> onChanged;

  const CategorySelector({
    super.key,
    required this.options,
    required this.selectedId,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    final double size = 72;
    final bool disableAnimations = MediaQuery.maybeOf(context)?.disableAnimations ?? false;

    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: options.map((o) {
        final bool selected = o.id == selectedId;
        return Semantics(
          label: 'Category ${o.label}',
          button: true,
          toggled: selected,
          child: GestureDetector(
            onTap: () => onChanged(o.id),
            child: AnimatedScale(
              scale: selected && !disableAnimations ? 1.06 : 1.0,
              duration: const Duration(milliseconds: 160),
              curve: Curves.easeOut,
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 220),
                curve: Curves.easeOut,
                width: size,
                height: size,
                decoration: BoxDecoration(
                  color: const Color(0xFF121B2A),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    width: selected ? 3 : 1,
                    color: selected
                        ? AppColors.accentPurple.withOpacity(0.8)
                        : Colors.white.withOpacity(0.08),
                  ),
                ),
                child: Stack(
                  children: [
                    Center(
                      child: SvgPicture.asset(
                        o.iconAsset,
                        width: 28,
                        height: 28,
                        colorFilter: const ColorFilter.mode(Colors.white, BlendMode.srcIn),
                        semanticsLabel: o.label,
                      ),
                    ),
                    Positioned(
                      right: 6,
                      top: 6,
                      child: AnimatedScale(
                        scale: selected ? 1 : 0.0,
                        duration: const Duration(milliseconds: 180),
                        curve: Curves.easeOutBack,
                        child: Container(
                          width: 18,
                          height: 18,
                          decoration: const BoxDecoration(
                            color: AppColors.accentGreen,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.check, size: 14, color: Colors.white),
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
          ),
        );
      }).toList(),
    );
  }
}

